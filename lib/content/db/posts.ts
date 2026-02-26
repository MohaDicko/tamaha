
import { prisma } from '@/lib/prisma';

export async function getPosts() {
    return await prisma.post.findMany({
        where: { published: true },
        orderBy: { date: 'desc' },
    });
}

export async function getPost(slug: string) {
    return await prisma.post.findUnique({
        where: { slug },
    });
}

export async function getFeaturedPosts() {
    return await prisma.post.findMany({
        where: { published: true, featured: true },
        orderBy: { date: 'desc' },
    });
}

export async function getTags() {
    const posts = await prisma.post.findMany({
        select: { tags: true },
    });
    const tags = new Set<string>();
    posts.forEach((post: { tags: string[] }) => post.tags.forEach((tag: string) => tags.add(tag)));
    return Array.from(tags).sort();
}
