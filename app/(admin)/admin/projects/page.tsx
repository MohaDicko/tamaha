"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    ExternalLink,
    Briefcase,
    LayoutGrid,
    FileText,
    Clock,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

type Project = {
    id: string;
    slug: string;
    title: string;
    date: string;
    status: string;
    published: boolean;
};

export default function AdminProjectsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/projects");
            if (!res.ok) throw new Error("Erreur");
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            toast.error("Impossible de charger les projets");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const deleteProject = async (id: string, title: string) => {
        if (!confirm(`Supprimer le projet "${title}" ? Cette action est irréversible.`)) return;
        try {
            const res = await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Erreur");
            toast.success("Projet supprimé");
            setProjects((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            toast.error("Erreur lors de la suppression");
        }
    };

    const filteredProjects = useMemo(() => {
        return projects.filter((p) => {
            const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchStatus = filterStatus === "all" || p.status === filterStatus;
            return matchSearch && matchStatus;
        });
    }, [projects, searchTerm, filterStatus]);

    const statuses = ["all", "ongoing", "completed", "planned"];

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter">
                        Gestion des <span className="text-primary italic">Projets</span>
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium">
                        {projects.length} projet{projects.length !== 1 ? "s" : ""} au total.
                    </p>
                </div>
                <Link href="/admin/projects/new">
                    <Button size="lg" className="rounded-2xl h-14 px-8 font-black uppercase tracking-widest shadow-xl shadow-primary/20 gap-3">
                        <Plus size={20} />
                        Nouveau Projet
                    </Button>
                </Link>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-card p-4 rounded-3xl border-2 border-border/50">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                        placeholder="Rechercher un projet..."
                        className="h-12 pl-12 rounded-2xl bg-muted/30 border-transparent focus:border-primary/20 transition-all font-bold"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
                    {statuses.map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={cn(
                                "h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2",
                                filterStatus === s
                                    ? "bg-primary border-primary text-white"
                                    : "bg-muted border-transparent text-muted-foreground hover:border-muted-foreground/20"
                            )}
                        >
                            {s === "all" ? "Tous" : s === "ongoing" ? "En cours" : s === "completed" ? "Terminé" : "Prévu"}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <div className="bg-card border-2 border-border/50 rounded-[2.5rem] overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-muted/30 border-b">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Projet</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Statut</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hidden md:table-cell">Date</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Visibilité</th>
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
                        ) : filteredProjects.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-16 text-center">
                                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                                        <Briefcase size={40} className="opacity-20" />
                                        <p className="font-medium">
                                            {searchTerm ? `Aucun résultat pour "${searchTerm}"` : "Aucun projet trouvé."}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredProjects.map((project, i) => (
                                <motion.tr
                                    key={project.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.04 }}
                                    className="hover:bg-muted/20 transition-colors group"
                                >
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                                                <Briefcase size={16} className="text-muted-foreground" />
                                            </div>
                                            <span className="font-black tracking-tight text-sm line-clamp-1">{project.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 hidden sm:table-cell">
                                        <span className={cn(
                                            "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                                            project.status === "ongoing" ? "bg-blue-100 text-blue-600" :
                                                project.status === "completed" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                                        )}>
                                            {project.status === "ongoing" ? "En cours" : project.status === "completed" ? "Terminé" : "Prévu"}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-sm text-muted-foreground font-medium hidden md:table-cell">
                                        {new Date(project.date).toLocaleDateString("fr-FR")}
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("w-2 h-2 rounded-full", project.published ? "bg-green-500" : "bg-orange-500")} />
                                            <span className={cn("text-[10px] font-black uppercase tracking-widest", project.published ? "text-green-500" : "text-orange-500")}>
                                                {project.published ? "Public" : "Brouillon"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link href={`/projects/${project.slug}`} target="_blank">
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-muted" title="Voir">
                                                    <ExternalLink size={15} />
                                                </Button>
                                            </Link>
                                            <Link href={`/admin/projects/${project.id}/edit`}>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary" title="Modifier">
                                                    <Edit2 size={15} />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-9 w-9 rounded-xl hover:bg-destructive/10 hover:text-destructive"
                                                title="Supprimer"
                                                onClick={() => deleteProject(project.id, project.title)}
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
            </div>
        </div>
    );
}
