import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Helper: generate unique slug
async function generateUniqueSlug(title: string): Promise<string> {
    const base = title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");

    const existing = await prisma.project.findUnique({ where: { slug: base } });
    if (!existing) return base;

    let counter = 2;
    while (true) {
        const candidate = `${base}-${counter}`;
        const existing2 = await prisma.project.findUnique({ where: { slug: candidate } });
        if (!existing2) return candidate;
        counter++;
    }
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const projects = await prisma.project.findMany({
            orderBy: { date: "desc" },
        });

        return NextResponse.json(projects);
    } catch (error: any) {
        console.error("Error fetching projects:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const data = await req.json();
        const { title, excerpt, content, status, cover, date } = data;

        if (!title || !excerpt || !content) {
            return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
        }

        const slug = await generateUniqueSlug(title);

        const project = await prisma.project.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                status: status || "ongoing",
                cover: cover || null,
                date: date ? new Date(date) : new Date(),
            },
        });

        return NextResponse.json({ success: true, id: project.id });
    } catch (error: any) {
        console.error("Error creating project:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const data = await req.json();
        const { id, title, excerpt, content, status, cover, date, published } = data;

        if (!id) {
            return NextResponse.json({ error: "ID manquant" }, { status: 400 });
        }

        const project = await prisma.project.update({
            where: { id },
            data: {
                title,
                excerpt,
                content,
                status,
                cover,
                date: date ? new Date(date) : undefined,
                published,
            },
        });

        return NextResponse.json({ success: true, slug: project.slug });
    } catch (error: any) {
        console.error("Error updating project:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

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

        await prisma.project.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error deleting project:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
