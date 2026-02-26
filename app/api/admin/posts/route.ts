
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await getServerSession();
        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const data = await req.json();
        const { title, excerpt, content, format, author, cover, tags, videoUrl } = data;

        // Générer un slug simple
        const slug = title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");

        const tagList = tags ? tags.split(",").map((t: string) => t.trim()).filter((t: string) => t !== "") : [];

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                excerpt,
                content, // Content from editor
                format: format || "article",
                author: author || "Tamaha Team",
                cover,
                videoUrl,
                tags: tagList,
                published: true,
                date: new Date(),
            }
        });

        return NextResponse.json({ success: true, slug: post.slug });
    } catch (error: any) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
