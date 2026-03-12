import { NextResponse } from "next/server";
import Stripe from "stripe";
import { rateLimit } from "@/lib/rate-limit";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_for_build', {
    apiVersion: "2024-04-10" as any,
});

export async function POST(req: Request) {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const limit = rateLimit(ip, 5); // Max 5 checkouts per 10min

    if (limit.isRateLimited) {
        return NextResponse.json(
            { error: "Trop de tentatives de paiement. Veuillez réessayer plus tard." },
            { status: 429 }
        );
    }

    try {
        const { amount, frequency, return_url, donationId } = await req.json();

        if (!amount) {
            return NextResponse.json(
                { error: "Le montant est requis" },
                { status: 400 }
            );
        }

        // Convertir l'argent en centimes pour Stripe (ex: 20 EUR -> 2000)
        const unitAmount = Math.round(amount * 100);

        let sessionParams: Stripe.Checkout.SessionCreateParams = {
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: "Don à l'Association Tammaha",
                            description: frequency === "monthly" ? "Don mensuel" : "Don ponctuel",
                            images: ["https://tammaha.org/logo.png"],
                        },
                        unit_amount: unitAmount,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${return_url}?success=true&amount=${amount}&method=card`,
            cancel_url: `${return_url}?canceled=true`,
            metadata: {
                donationId: donationId || '',
            },
        };

        const checkoutSession: Stripe.Checkout.Session =
            await stripe.checkout.sessions.create(sessionParams);

        return NextResponse.json({ url: checkoutSession.url });
    } catch (err: any) {
        console.error("Erreur création session Stripe:", err);

        let errorMessage = "Erreur interne";
        if (err.message?.includes("No API key provided")) {
            errorMessage = "Configuration Stripe manquante (Clé API non configurée dans .env)";
        } else if (err.message) {
            errorMessage = err.message;
        }

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
