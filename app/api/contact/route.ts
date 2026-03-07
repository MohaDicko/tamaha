
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/email/resend';
import { env } from '@/lib/env';

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(5),
    message: z.string().min(10),
    honeypot: z.string().optional().or(z.literal('')),
    turnstileToken: z.string().min(1),
});

export async function POST(req: Request) {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';

    const limit = rateLimit(ip);
    if (limit.isRateLimited) {
        return NextResponse.json(
            { error: 'Trop de requêtes. Veuillez réessayer plus tard.' },
            { status: 429 }
        );
    }

    try {
        const body = await req.json();
        const result = contactSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: 'Données invalides', details: result.error.flatten() },
                { status: 400 }
            );
        }

        const { name, email, subject, message, honeypot, turnstileToken } = result.data;

        if (honeypot) {
            // Robot detected, return fake success
            return NextResponse.json({ success: true });
        }

        // Verify Turnstile Token
        const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
        const secret = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';

        const turnstileRes = await fetch(verifyEndpoint, {
            method: 'POST',
            body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(turnstileToken)}`,
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        });

        const turnstileData = await turnstileRes.json();
        if (!turnstileData.success) {
            return NextResponse.json(
                { error: 'Échec de la validation anti-robot. Veuillez réessayer.' },
                { status: 400 }
            );
        }

        // Save to Database
        try {
            await prisma.message.create({
                data: { name, email, subject, message }
            });
        } catch (dbError) {
            console.error('Database Error (Contact):', dbError);
            // We continue even if DB fails, as email might still work
        }

        if (resend && env.CONTACT_TO_EMAIL) {
            try {
                // Email de notification interne à l'équipe Tammaha
                await resend.emails.send({
                    from: 'Tammaha Contact <onboarding@resend.dev>',
                    to: env.CONTACT_TO_EMAIL,
                    subject: `[Contact Tammaha] ${subject}`,
                    reply_to: email,
                    text: `Nouveau message de contact\n\nNom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
                });

                // ✅ Email de confirmation automatique à l'expéditeur
                await resend.emails.send({
                    from: 'Tammaha <onboarding@resend.dev>',
                    to: email,
                    subject: `Votre message a bien été reçu — Tammaha`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px;">
                            <h2 style="font-size: 22px; font-weight: 900; margin-bottom: 8px;">Merci, ${name} !</h2>
                            <p style="color: #555; line-height: 1.6;">
                                Nous avons bien reçu votre message concernant : <strong>${subject}</strong>.
                            </p>
                            <p style="color: #555; line-height: 1.6;">
                                L'équipe Tammaha vous répondra dans les meilleurs délais, généralement sous 48h ouvrées.
                            </p>
                            <div style="background: #f5f5f5; border-radius: 12px; padding: 16px; margin: 20px 0; border-left: 4px solid #000;">
                                <p style="margin: 0; font-size: 13px; color: #888; font-style: italic;">"${message.substring(0, 200)}${message.length > 200 ? '...' : ''}"</p>
                            </div>
                            <p style="color: #555; line-height: 1.6;">
                                En attendant, n'hésitez pas à découvrir nos actions sur <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://tammaha.org'}" style="color: #000; font-weight: bold;">notre site</a>.
                            </p>
                            <p style="font-size: 12px; color: #aaa; margin-top: 32px;">
                                Association Tammaha · Niamana Dougoukoro · Ce message est envoyé automatiquement.
                            </p>
                        </div>
                    `,
                });
            } catch (emailError) {
                console.error('Resend Error:', emailError);
                // On ne bloque pas si l'email échoue — le message est déjà en DB
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}
