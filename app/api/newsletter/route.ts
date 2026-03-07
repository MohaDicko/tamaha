
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const limit = rateLimit(ip, 3); // Max 3 per 10min

  if (limit.isRateLimited) {
    return NextResponse.json(
      { error: "Trop de tentatives. Veuillez réessayer plus tard." },
      { status: 429 }
    );
  }

  try {
    const { email, turnstileToken } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
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

    // Save to DB
    try {
      await prisma.newsletter.upsert({
        where: { email },
        update: {},
        create: { email }
      });
    } catch (dbError) {
      console.error("Newsletter DB error:", dbError);
    }

    // Note: Pour une vraie newsletter, vous devriez utiliser 
    // resend.contacts.create({ audience_id: '...', email: email })
    // Pour cette démo, on simule l'envoi d'un mail de bienvenue

    await resend.emails.send({
      from: "Tammaha <onboarding@resend.dev>", // Utilisez votre domaine vérifié en prod
      to: email,
      subject: "Bienvenue dans la communauté Tammaha ! 🌍",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h1 style="color: #000; text-align: center;">Merci de nous avoir rejoints !</h1>
          <p style="font-size: 16px; line-height: 1.6; color: #444;">
            C'est un honneur de vous compter parmi nous. Grâce à votre intérêt, nous pouvons faire rayonner nos actions au Sénégal et au Mali.
          </p>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold;">Dans nos prochaines actualités :</p>
            <ul style="color: #666;">
              <li>Avancement des forages à Matam</li>
              <li>Résultats des campagnes de santé</li>
              <li>Invitations à nos événements exclusifs</li>
            </ul>
          </div>
          <p style="font-size: 12px; color: #999; text-align: center;">
            Association Tammaha • Ensemble pour un impact durable
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
