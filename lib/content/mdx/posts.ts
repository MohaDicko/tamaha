
import { allPosts, type Post } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

export { type Post };

export function getPosts(): Post[] {
    return allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

export function getPost(slug: string): Post | undefined {
    return allPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): Post[] {
    return allPosts.filter((post) => post.featured).sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

export function getTags(): string[] {
    const tags = new Set<string>();
    allPosts.forEach((post) => post.tags?.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
}
