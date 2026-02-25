
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import fs from "fs";
import path from "path";

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
            .replace(/[^a-z0-0]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");

        const date = new Date().toISOString().split("T")[0];
        const tagList = tags.split(",").map((t: string) => t.trim()).filter((t: string) => t !== "");

        // Préparer le contenu MDX avec frontmatter
        let frontmatter = `---
title: ${title}
date: ${date}
excerpt: ${excerpt}
format: ${format}
author: ${author}
`;

        if (cover) frontmatter += `cover: ${cover}\n`;
        if (videoUrl) frontmatter += `videoUrl: ${videoUrl}\n`;
        if (tagList.length > 0) {
            frontmatter += `tags:\n`;
            tagList.forEach((tag: string) => {
                frontmatter += `  - ${tag}\n`;
            });
        }

        frontmatter += `---

${content}
`;

        const filePath = path.join(process.cwd(), "content", "posts", `${slug}.mdx`);

        // Vérifier si le dossier existe
        const dirPath = path.dirname(filePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        fs.writeFileSync(filePath, frontmatter, "utf8");

        return NextResponse.json({ success: true, slug });
    } catch (error: any) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
