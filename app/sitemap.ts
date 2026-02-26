
import { MetadataRoute } from 'next';
import { getPosts, getProjects, getEvents } from '@/lib/content';
import { env } from '@/lib/env';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getPosts();
    const projects = await getProjects();
    const events = await getEvents();
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

    const blogRoutes = posts.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    const projectRoutes = projects.map((project: any) => ({
        url: `${baseUrl}/actions/${project.slug}`,
        lastModified: new Date(project.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const eventRoutes = events.map((event: any) => ({
        url: `${baseUrl}/events/${event.slug}`,
        lastModified: new Date(event.date),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...routes, ...blogRoutes, ...projectRoutes, ...eventRoutes];
}
