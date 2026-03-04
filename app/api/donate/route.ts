import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';

const donationSchema = z.object({
    amount: z.number().positive(),
    method: z.string(),
    provider: z.string().nullable(),
    frequency: z.string(),
});

export async function POST(req: Request) {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';

    // Prevent spam (max 5 donations initiated per hour per IP)
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

        const { amount, method, provider, frequency } = result.data;

        // Save pending donation to track intent
        const donation = await prisma.donation.create({
            data: {
                amount,
                method,
                provider: provider || null,
                frequency,
                status: 'PENDING'
            }
        });

        // Here you would typically integrate with Stripe for card payments
        // For mobile and transfer, they are handled entirely on the frontend via manual instructions

        return NextResponse.json({
            success: true,
            id: donation.id,
            reference: `DON-TAMAHA-${donation.id.slice(-5).toUpperCase()}`
        });
    } catch (error) {
        console.error('Donation API Error:', error);
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
    }
}
