
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit2,
    Trash2,
    ExternalLink,
    Newspaper,
    LayoutGrid,
    FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

// Mock data based on the Contentlayer structure
type Post = {
    id: string;
    slug: string;
    title: string;
    date: string;
    format: string;
    published: boolean;
};

export default function AdminPostsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState<"grid" | "list">("list");
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/posts");
            if (!res.ok) throw new Error("Erreur");
            const data = await res.json();
            setPosts(data);
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
        if (!confirm(`T'es-tu sûr de vouloir supprimer l'article "${title}" ?`)) return;
        try {
            const res = await fetch(`/api/admin/posts?id=${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Erreur");
            toast.success("Article supprimé");
            setPosts((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            toast.error("Erreur lors de la suppression");
        }
    };

    const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-10">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter">Blog & <span className="text-primary italic">Articles</span></h1>
                    <p className="text-muted-foreground text-sm font-medium">Gérez toutes les publications du site Tamaha.</p>
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
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button variant="outline" className="h-12 rounded-2xl flex-1 sm:flex-none border-2 px-6 font-black uppercase tracking-widest text-[10px] gap-2">
                        <Filter size={14} /> Filtres
                    </Button>
                    <div className="flex bg-muted p-1 rounded-2xl">
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
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Format</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Date</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Statut</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-10 text-center text-muted-foreground font-medium">
                                    Chargement des articles...
                                </td>
                            </tr>
                        ) : filteredPosts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-10 text-center text-muted-foreground font-medium">
                                    Aucun article trouvé.
                                </td>
                            </tr>
                        ) : filteredPosts.map((post, i) => (
                            <motion.tr
                                key={post.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="hover:bg-muted/20 transition-colors group"
                            >
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center shrink-0">
                                            <Newspaper size={20} className="text-muted-foreground" />
                                        </div>
                                        <span className="font-black tracking-tight text-sm line-clamp-1">{post.title}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-muted rounded-full">
                                        {post.format}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-sm text-muted-foreground font-medium">
                                    {new Date(post.date).toLocaleDateString("fr-FR")}
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2">
                                        <div className={cn("w-2 h-2 rounded-full", post.published ? "bg-green-500" : "bg-orange-500")} />
                                        <span className={cn("text-[10px] font-black uppercase tracking-widest", post.published ? "text-green-500" : "text-orange-500")}>
                                            {post.published ? "Publié" : "Brouillon"}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-destructive/10 hover:text-destructive" onClick={() => deletePost(post.id, post.title)}>
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
