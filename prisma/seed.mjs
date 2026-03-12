
import { PrismaClient } from '@prisma/client';
import { allPosts, allEvents, allProjects } from './.contentlayer/generated/index.mjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Seed starting...');

    // Seed Posts
    for (const post of allPosts) {
        await prisma.post.upsert({
            where: { slug: post.slug },
            update: {},
            create: {
                slug: post.slug,
                title: post.title,
                date: new Date(post.date),
                excerpt: post.excerpt,
                content: post.body.raw,
                cover: post.cover,
                tags: JSON.stringify(post.tags || []),
                featured: post.featured || false,
                format: post.format || 'article',
                videoUrl: post.videoUrl,
                author: post.author,
                authorAvatar: post.authorAvatar,
            },
        });
    }

    // Seed Events
    for (const event of allEvents) {
        await prisma.event.upsert({
            where: { slug: event.slug },
            update: {},
            create: {
                slug: event.slug,
                title: event.title,
                date: new Date(event.date),
                excerpt: event.excerpt,
                content: event.body.raw,
                cover: event.cover,
                location: event.location,
            },
        });
    }

    // Seed Projects
    for (const project of allProjects) {
        await prisma.project.upsert({
            where: { slug: project.slug },
            update: {},
            create: {
                slug: project.slug,
                title: project.title,
                date: new Date(project.date),
                excerpt: project.excerpt,
                content: project.body.raw,
                cover: project.cover,
                status: project.status || 'ongoing',
            },
        });
    }

    console.log('Seed finished successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
