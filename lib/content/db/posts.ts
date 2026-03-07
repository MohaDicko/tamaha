
import { prisma } from '@/lib/prisma';

export async function getPosts() {
    return await prisma.post.findMany({
        where: { published: true },
        orderBy: { date: 'desc' },
    });
}

export async function getPost(slug: string) {
    // ✅ Filtre sur published pour éviter la fuite de brouillons
    return await prisma.post.findFirst({
        where: { slug, published: true },
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
    posts.forEach((post) => {
        try {
            const parsedTags = typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags;
            if (Array.isArray(parsedTags)) {
                parsedTags.forEach((tag: string) => tags.add(tag));
            }
        } catch (e) {
            // Ignore parse errors
        }
    });
    return Array.from(tags).sort();
}
