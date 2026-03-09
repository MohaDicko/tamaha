import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
});

export const runtime = 'edge';

// Le prompt système définit le persona de l'IA
const systemPrompt = `Tu es l'assistant IA de l'association caritative "Tammaha". 
Ton rôle est d'informer les visiteurs, de répondre à leurs questions avec courtoisie, et de les diriger vers les informations clés du site.
Sois toujours poli, chaleureux, empathique et professionnel. Garde tes réponses courtes (moins de 4 phrases si possible), claires et engageantes.
Utilise des émojis de temps en temps pour rendre la conversation conviviale.
L'association Tammaha est une organisation dédiée à diverses œuvres de charité, de solidarité, d'entraide, d'éducation et projets sur le terrain.
L'utilisateur peut faire un don en se rendant sur la page de dons (/donate).
L'utilisateur peut voir les derniers projets sur la page blog (/blog) ou les actions.
Important: Ne donne pas d'informations personnelles sensibles. Si tu ne connais pas la réponse, dis que tu es un assistant virtuel et propose d'utiliser le formulaire de contact (/contact).`;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const result = await streamText({
            model: google('models/gemini-1.5-flash'), // Model gratuit très rapide et puissant
            system: systemPrompt,
            messages,
            temperature: 0.7,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error("Chat API error:", error);
        // Retourne une erreur gracieuse
        return new Response(
            JSON.stringify({ error: "Failed to generate AI response. Please check your API key." }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
