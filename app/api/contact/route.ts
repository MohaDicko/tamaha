
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { resend } from '@/lib/email/resend';
import { env } from '@/lib/env';

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(5),
    message: z.string().min(10),
    honeypot: z.string().optional().or(z.literal('')),
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

        const { name, email, subject, message, honeypot } = result.data;

        if (honeypot) {
            // Robot detected, return fake success
            return NextResponse.json({ success: true });
        }

        if (resend && env.CONTACT_TO_EMAIL) {
            try {
                await resend.emails.send({
                    from: 'Tamaha Contact <onboarding@resend.dev>',
                    to: env.CONTACT_TO_EMAIL,
                    subject: `[Contact Tamaha] ${subject}`,
                    reply_to: email, // Note: resend uses 'reply_to'
                    text: `Nouveau message de contact\n\nNom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
                });
            } catch (emailError) {
                console.error('Resend Error:', emailError);
                // Don't fail the request if email fails, just log it (or return 500 if critical)
                return NextResponse.json({ error: "Erreur lors de l'envoi de l'email." }, { status: 500 });
            }
        } else {
            console.log('MAILING SIMULATION (No API Key or To Email):', { name, email, subject, message });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}
