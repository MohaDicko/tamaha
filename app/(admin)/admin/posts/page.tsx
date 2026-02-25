
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

// Mock data based on the Contentlayer structure
const initialPosts = [
    { slug: "status-mission-matam", title: "Bientôt une nouvelle mission à Matam !", date: "2024-02-25", format: "status", status: "Publié" },
    { slug: "tamaha-climat", title: "Tamaha s'engage pour le climat", date: "2024-02-21", format: "article", status: "Publié" },
    { slug: "tuto-lavage-mains", title: "Tuto : Hygiène des mains", date: "2024-02-20", format: "video", status: "Publié" },
    { slug: "visite-centre-sante", title: "Visite au Centre de Santé de Niamana", date: "2024-02-18", format: "video", status: "Publié" },
];

export default function AdminPostsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState<"grid" | "list">("list");

    return (
        <div className="space-y-10">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter">Blog & <span className="text-primary italic">Articles</span></h1>
                    <p className="text-muted-foreground text-sm font-medium">Gérez toutes les publications du site Tamaha.</p>
                </div>
                <Button size="lg" className="rounded-2xl h-14 px-8 font-black uppercase tracking-widest shadow-xl shadow-primary/20 gap-3">
                    <Plus size={20} />
                    Nouvel Article
                </Button>
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
                        {initialPosts.map((post, i) => (
                            <motion.tr
                                key={post.slug}
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
                                    {post.date}
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-green-500">{post.status}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary">
                                            <Edit2 size={16} />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-destructive/10 hover:text-destructive">
                                            <Trash2 size={16} />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                                            <MoreVertical size={16} />
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
