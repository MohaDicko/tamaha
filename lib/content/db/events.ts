
import { prisma } from '@/lib/prisma';

export async function getEvents() {
    return await prisma.event.findMany({
        where: { published: true },
        orderBy: { date: 'desc' },
    });
}

export async function getEvent(slug: string) {
    return await prisma.event.findUnique({
        where: { slug },
    });
}
