import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'ADMIN') {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        const donations = await prisma.donation.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(donations);
    } catch (error) {
        console.error("Erreur lors de la récupération des dons:", error);
        return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'ADMIN') {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
        }

        const donation = await prisma.donation.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json(donation);
    } catch (error) {
        console.error("Erreur lors de la mise à jour du don:", error);
        return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
    }
}
