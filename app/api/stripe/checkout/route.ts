import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
    try {
        const { amount, frequency, return_url } = await req.json();

        if (!amount) {
            return NextResponse.json(
                { error: "Le montant est requis" },
                { status: 400 }
            );
        }

        // Convertir l'argent en centimes pour Stripe (ex: 20 EUR -> 2000)
        // Nota : Les montants reçus pour Stripe seront potentiellement en € au lieu de CFA,
        // ou bien convertis mathématiquement (ex: 1€ = 655 CFA). 
        // Pour l'instant, on suppose que `amount` est envoyé en EUR si méthode = Carte.
        const unitAmount = Math.round(amount * 100);

        let sessionParams: Stripe.Checkout.SessionCreateParams = {
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: "Don à l'Association Tamaha",
                            description: frequency === "monthly" ? "Don mensuel" : "Don ponctuel",
                            images: ["https://tamaha.vercel.app/logo.png"], // Remplacer par un vrai lien plus tard
                        },
                        unit_amount: unitAmount,
                        // Stripe nécessite une configuration produit différente pour les abonnements
                        // Pour simplifier ce MVP, on fait uniquement du "payment" (ponctuel) même
                        // si l'intention était un don régulier, on gérera les abonnements complexes plus tard.
                    },
                    quantity: 1,
                },
            ],
            mode: "payment", // Ou 'subscription' pour des dons mensuels, mais demande de créer des "Products" dans Stripe.
            success_url: `${return_url}?success=true&amount=${amount}&method=card`,
            cancel_url: `${return_url}?canceled=true`,
        };

        const checkoutSession: Stripe.Checkout.Session =
            await stripe.checkout.sessions.create(sessionParams);

        return NextResponse.json({ url: checkoutSession.url });
    } catch (err: any) {
        console.error("Erreur création session Stripe:", err);
        return NextResponse.json(
            { error: err.message || "Erreur interne" },
            { status: 500 }
        );
    }
}
