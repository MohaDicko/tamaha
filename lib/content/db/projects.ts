
import { prisma } from '@/lib/prisma';

export async function getProjects() {
    return await prisma.project.findMany({
        where: { published: true },
        orderBy: { date: 'desc' },
    });
}

export async function getProject(slug: string) {
    return await prisma.project.findUnique({
        where: { slug },
    });
}
