import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession();
        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        // Calculate Stats
        // 1. New Contacts (Unread messages)
        const unreadMessagesCount = await prisma.message.count({
            where: { read: false }
        });

        // 2. Donations Amount (Completed)
        const donationsAggregate = await prisma.donation.aggregate({
            _sum: { amount: true },
            where: { status: "COMPLETED" }
        });
        const totalDonations = donationsAggregate._sum.amount || 0;

        // 3. Subscribers/Beneficiaries (Newsletter or just users?)
        const newsletterCount = await prisma.newsletter.count();

        // 4. Site Visits - we don't have this in DB, we'll keep a placeholder or just use 0

        // Fetch Recent Activity
        // Recent Posts
        const recentPosts = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
            take: 3,
            select: { title: true, author: true, createdAt: true, published: true }
        });

        // Recent Messages (Contacts)
        const recentMessages = await prisma.message.findMany({
            orderBy: { createdAt: 'desc' },
            take: 3,
            select: { subject: true, name: true, createdAt: true, read: true }
        });

        // Normalize Activity
        const activity = [
            ...recentPosts.map(p => ({
                type: 'post',
                title: p.title,
                user: p.author,
                date: p.createdAt,
                status: p.published ? 'Publié' : 'Brouillon'
            })),
            ...recentMessages.map(m => ({
                type: 'contact',
                title: m.subject,
                user: m.name,
                date: m.createdAt,
                status: m.read ? 'Lu' : 'Nouveau'
            }))
        ]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5); // Take top 5 recent activities

        return NextResponse.json({
            stats: {
                messagesCount: unreadMessagesCount,
                donationsSum: totalDonations,
                newsletterCount: newsletterCount,
                visits: 12450 // placeholder
            },
            activity
        });

    } catch (error: any) {
        console.error("Error fetching stats:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
