
import { prisma } from '@/lib/prisma';

function parsePost(post: any) {
    if (!post) return null;
    let parsedTags = [];
    let parsedImages = [];

    try {
        parsedTags = typeof post.tags === 'string' ? JSON.parse(post.tags) : (post.tags || []);
    } catch (e) {
        console.error("Error parsing tags for post:", post.id, e);
    }

    try {
        parsedImages = typeof post.images === 'string' ? JSON.parse(post.images) : (post.images || []);
    } catch (e) {
        console.error("Error parsing images for post:", post.id, e);
    }

    return {
        ...post,
        tags: Array.isArray(parsedTags) ? parsedTags : [],
        images: Array.isArray(parsedImages) ? parsedImages : [],
    };
}

export async function getPosts() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { date: 'desc' },
    });
    return posts.map(parsePost);
}

export async function getPost(slug: string) {
    // ✅ Filtre sur published pour éviter la fuite de brouillons
    const post = await prisma.post.findFirst({
        where: { slug, published: true },
    });
    return parsePost(post);
}

export async function getFeaturedPosts() {
    const posts = await prisma.post.findMany({
        where: { published: true, featured: true },
        orderBy: { date: 'desc' },
    });
    return posts.map(parsePost);
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
