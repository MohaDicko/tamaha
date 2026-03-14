import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ─── Helper : génère un slug unique ─────────────────────────────────────────
async function generateUniqueSlug(title: string): Promise<string> {
    const base = title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");

    // Vérifie si le slug existe déjà
    const existing = await prisma.post.findUnique({ where: { slug: base } });
    if (!existing) return base;

    // Ajoute un suffixe numérique jusqu'à trouver un slug libre
    let counter = 2;
    while (true) {
        const candidate = `${base}-${counter}`;
        const existing2 = await prisma.post.findUnique({ where: { slug: candidate } });
        if (!existing2) return candidate;
        counter++;
    }
}

// ─── POST : Créer un article ─────────────────────────────────────────────────
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const data = await req.json();
        const { title, excerpt, content, format, author, cover, tags, videoUrl, published } = data;

        if (!title || !excerpt || !content) {
            return NextResponse.json({ error: "Champs requis manquants (titre, résumé, contenu)" }, { status: 400 });
        }

        // Slug unique (gère les doublons)
        const slug = await generateUniqueSlug(title);

        // ✅ CORRECTION BUG TAGS : stocke le tableau en JSON string
        const tagList = tags
            ? tags.split(",").map((t: string) => t.trim()).filter((t: string) => t !== "")
            : [];

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                format: format || "article",
                author: author || "Tammaha Team",
                cover: cover || null,
                videoUrl: videoUrl || null,
                tags: JSON.stringify(tagList), // ✅ Fix : JSON.stringify
                published: published !== false, // true par défaut
                date: new Date(),
            },
        });

        return NextResponse.json({ success: true, id: post.id, slug: post.slug });
    } catch (error: any) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ─── GET : Lister les articles ───────────────────────────────────────────────
export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const url = new URL(req.url);
        const search = url.searchParams.get("search") || "";
        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const limit = parseInt(url.searchParams.get("limit") || "20", 10);
        const skip = (page - 1) * limit;

        const where = search
            ? {
                OR: [
                    { title: { contains: search, mode: "insensitive" as const } },
                    { author: { contains: search, mode: "insensitive" as const } },
                ],
            }
            : {};

        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                where,
                orderBy: { date: "desc" },
                skip,
                take: limit,
                select: { id: true, slug: true, title: true, date: true, format: true, published: true, author: true, createdAt: true },
            }),
            prisma.post.count({ where }),
        ]);

        return NextResponse.json({ posts, total, page, limit });
    } catch (error: any) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ─── PUT : Modifier un article ───────────────────────────────────────────────
export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const data = await req.json();
        const { id, title, excerpt, content, format, author, cover, tags, videoUrl, published } = data;

        if (!id) {
            return NextResponse.json({ error: "ID de l'article manquant" }, { status: 400 });
        }

        const tagList = tags
            ? tags.split(",").map((t: string) => t.trim()).filter((t: string) => t !== "")
            : [];

        const post = await prisma.post.update({
            where: { id },
            data: {
                title,
                excerpt,
                content,
                format: format || "article",
                author: author || "Tammaha Team",
                cover: cover || null,
                videoUrl: videoUrl || null,
                tags: JSON.stringify(tagList), // ✅ Fix : JSON.stringify
                published: published !== false,
            },
        });

        return NextResponse.json({ success: true, slug: post.slug });
    } catch (error: any) {
        console.error("Error updating post:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ─── DELETE : Supprimer un article ──────────────────────────────────────────
export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID manquant" }, { status: 400 });
        }

        await prisma.post.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
