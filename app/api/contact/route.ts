
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
                await resend.emails.send({
                    from: 'Tamaha Contact <onboarding@resend.dev>',
                    to: env.CONTACT_TO_EMAIL,
                    subject: `[Contact Tamaha] ${subject}`,
                    reply_to: email,
                    text: `Nouveau message de contact\n\nNom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
                });
            } catch (emailError) {
                console.error('Resend Error:', emailError);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}
