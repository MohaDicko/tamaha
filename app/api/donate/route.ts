import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';

const donationSchema = z.object({
    amount: z.number().positive().max(10_000_000),
    method: z.enum(['card', 'mobile', 'transfer']),
    provider: z.string().nullable().optional(),
    frequency: z.enum(['once', 'monthly']),
    turnstileToken: z.string().optional(), // Falcultatif pour mobile/virement, mais recommandé pour card
});

export async function POST(req: Request) {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';

    // Limite : 5 tentatives par heure par IP
    const limit = rateLimit(`donate_${ip}`, 5, 3600000);
    if (limit.isRateLimited) {
        return NextResponse.json({ error: 'Trop de requêtes. Veuillez réessayer plus tard.' }, { status: 429 });
    }

    try {
        const body = await req.json();
        const result = donationSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: 'Données invalides', details: result.error.flatten() }, { status: 400 });
        }

        const { amount, method, provider, frequency, turnstileToken } = result.data;

        // Verify Turnstile for Card payments mainly
        if (method === 'card' && turnstileToken) {
            const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
            const secret = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';

            const turnstileRes = await fetch(verifyEndpoint, {
                method: 'POST',
                body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(turnstileToken)}`,
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            });

            const turnstileData = await turnstileRes.json();
            if (!turnstileData.success) {
                return NextResponse.json({ error: 'Validation anti-robot échouée' }, { status: 400 });
            }
        }

        // Enregistre l'intention de don (PENDING)
        const donation = await prisma.donation.create({
            data: {
                amount,
                method,
                provider: provider || null,
                frequency,
                status: 'PENDING',
            },
        });

        const reference = `DON-TAMMAHA-${donation.id.slice(-6).toUpperCase()}`;

        // ✅ URL de redirection vers la page de succès avec récapitulatif
        const successUrl = `/donate/success?ref=${encodeURIComponent(reference)}&amount=${amount}&method=${encodeURIComponent(provider || method)}`;

        return NextResponse.json({
            success: true,
            id: donation.id,
            reference,
            successUrl, // Le front redirige vers cette URL après confirmation
        });
    } catch (error) {
        console.error('Donation API Error:', error);
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}
