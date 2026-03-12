import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16' as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`❌ Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Gérer l'événement checkout.session.completed
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        // Récupérer l'ID de donation stocké dans les métadonnées lors de la création de la session
        const donationId = session.metadata?.donationId;

        if (donationId) {
            try {
                await prisma.donation.update({
                    where: { id: donationId },
                    data: {
                        status: 'COMPLETED',
                        updatedAt: new Date(),
                    },
                });
                console.log(`✅ Donation ${donationId} marquée comme COMPLETED`);
            } catch (error) {
                console.error(`❌ Erreur lors de la mise à jour de la donation ${donationId}:`, error);
                return NextResponse.json({ error: 'Error updating donation' }, { status: 500 });
            }
        }
    }

    return NextResponse.json({ received: true });
}
