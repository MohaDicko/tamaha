"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    ExternalLink,
    Newspaper,
    LayoutGrid,
    FileText,
    Eye,
    EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

type Post = {
    id: string;
    slug: string;
    title: string;
    date: string;
    format: string;
    published: boolean;
    author: string;
};

export default function AdminPostsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterFormat, setFilterFormat] = useState<string>("all");
    const [view, setView] = useState<"grid" | "list">("list");
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/posts");
            if (!res.ok) throw new Error("Erreur");
            const data = await res.json();
            // Support both old array format and new paginated format
            setPosts(Array.isArray(data) ? data : data.posts ?? []);
        } catch (error) {
            toast.error("Impossible de charger les articles");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const deletePost = async (id: string, title: string) => {
        if (!confirm(`Supprimer l'article "${title}" ? Cette action est irréversible.`)) return;
        try {
            const res = await fetch(`/api/admin/posts?id=${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Erreur");
            toast.success("Article supprimé");
            setPosts((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            toast.error("Erreur lors de la suppression");
        }
    };

    // ✅ Recherche + filtrage actifs côté client
    const filteredPosts = useMemo(() => {
        return posts.filter((p) => {
            const matchSearch =
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchFormat = filterFormat === "all" || p.format === filterFormat;
            return matchSearch && matchFormat;
        });
    }, [posts, searchTerm, filterFormat]);

    const formats = ["all", "article", "video", "gallery", "status"];

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter">
                        Blog & <span className="text-primary italic">Articles</span>
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium">
                        {posts.length} publication{posts.length !== 1 ? "s" : ""} au total.
                    </p>
                </div>
                <Link href="/admin/posts/new">
                    <Button size="lg" className="rounded-2xl h-14 px-8 font-black uppercase tracking-widest shadow-xl shadow-primary/20 gap-3">
                        <Plus size={20} />
                        Nouvel Article
                    </Button>
                </Link>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-card p-4 rounded-3xl border-2 border-border/50">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                        placeholder="Rechercher par titre, auteur..."
                        className="h-12 pl-12 rounded-2xl bg-muted/30 border-transparent focus:border-primary/20 transition-all font-bold"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
                    {/* Filtre par format */}
                    {formats.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilterFormat(f)}
                            className={cn(
                                "h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2",
                                filterFormat === f
                                    ? "bg-primary border-primary text-white"
                                    : "bg-muted border-transparent text-muted-foreground hover:border-muted-foreground/20"
                            )}
                        >
                            {f === "all" ? "Tous" : f}
                        </button>
                    ))}
                    {/* Toggle vue */}
                    <div className="flex bg-muted p-1 rounded-2xl ml-2">
                        <button
                            onClick={() => setView("list")}
                            className={cn("p-2.5 rounded-xl transition-all", view === "list" ? "bg-background shadow-sm text-primary" : "text-muted-foreground")}
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button
                            onClick={() => setView("grid")}
                            className={cn("p-2.5 rounded-xl transition-all", view === "grid" ? "bg-background shadow-sm text-primary" : "text-muted-foreground")}
                        >
                            <FileText size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Posts List */}
            <div className="bg-card border-2 border-border/50 rounded-[2.5rem] overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-muted/30 border-b">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Article</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Format</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hidden md:table-cell">Date</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Statut</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-10 text-center text-muted-foreground font-medium">
                                    <div className="flex justify-center">
                                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                    </div>
                                </td>
                            </tr>
                        ) : filteredPosts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-16 text-center">
                                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                                        <Newspaper size={40} className="opacity-20" />
                                        <p className="font-medium">
                                            {searchTerm ? `Aucun résultat pour "${searchTerm}"` : "Aucun article trouvé."}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredPosts.map((post, i) => (
                                <motion.tr
                                    key={post.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.04 }}
                                    className="hover:bg-muted/20 transition-colors group"
                                >
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                                                <Newspaper size={16} className="text-muted-foreground" />
                                            </div>
                                            <div className="space-y-0.5">
                                                <span className="font-black tracking-tight text-sm line-clamp-1">{post.title}</span>
                                                <span className="text-[10px] text-muted-foreground font-medium">{post.author}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 hidden sm:table-cell">
                                        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-muted rounded-full">
                                            {post.format}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-sm text-muted-foreground font-medium hidden md:table-cell">
                                        {new Date(post.date).toLocaleDateString("fr-FR")}
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("w-2 h-2 rounded-full", post.published ? "bg-green-500" : "bg-orange-500")} />
                                            <span className={cn("text-[10px] font-black uppercase tracking-widest", post.published ? "text-green-500" : "text-orange-500")}>
                                                {post.published ? "Publié" : "Brouillon"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center justify-end gap-1">
                                            {/* ✅ Bouton Voir */}
                                            <Link href={`/blog/${post.slug}`} target="_blank">
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-muted" title="Voir l'article">
                                                    <ExternalLink size={15} />
                                                </Button>
                                            </Link>
                                            {/* ✅ Bouton Modifier */}
                                            <Link href={`/admin/posts/${post.id}/edit`}>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary" title="Modifier">
                                                    <Edit2 size={15} />
                                                </Button>
                                            </Link>
                                            {/* Bouton Supprimer */}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-9 w-9 rounded-xl hover:bg-destructive/10 hover:text-destructive"
                                                title="Supprimer"
                                                onClick={() => deletePost(post.id, post.title)}
                                            >
                                                <Trash2 size={15} />
                                            </Button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Footer stats */}
                {!loading && filteredPosts.length > 0 && (
                    <div className="px-8 py-4 border-t bg-muted/20 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <span>{filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} affiché{filteredPosts.length !== 1 ? "s" : ""}</span>
                        <span>{posts.filter(p => p.published).length} publié{posts.filter(p => p.published).length !== 1 ? "s" : ""}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
