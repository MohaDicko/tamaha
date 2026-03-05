import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const session = await getServerSession();

    if (!session) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        const messages = await prisma.message.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(messages);
    } catch (error) {
        console.error("Erreur lors de la récupération des messages:", error);
        return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const session = await getServerSession();

    if (!session) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { id, read } = body;

        if (!id || read === undefined) {
            return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
        }

        const message = await prisma.message.update({
            where: { id },
            data: { read }
        });

        return NextResponse.json(message);
    } catch (error) {
        console.error("Erreur lors de la mise à jour du message:", error);
        return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession();

    if (!session) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
        }

        await prisma.message.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
    }
}
