
import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/content';
import { env } from '@/lib/env';

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getPosts();
    const baseUrl = env.NEXT_PUBLIC_SITE_URL;

    const routes = [
        '',
        '/about',
        '/actions',
        '/events',
        '/blog',
        '/partners',
        '/donate',
        '/contact',
        '/legal/terms',
        '/legal/privacy',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...routes, ...blogRoutes];
}
