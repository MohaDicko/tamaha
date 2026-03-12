"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Save,
    Image as ImageIcon,
    Calendar as CalendarIcon,
    FileText,
    Clock,
    Loader2,
    Eye,
    Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

const parseMarkdown = (text: string) => {
    return text
        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-2">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-black mt-10 mb-6">$1</h1>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/\n/g, '<br />');
};

export default function NewProjectPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        status: "ongoing",
        cover: "",
        date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/admin/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Erreur");

            toast.success("Projet créé avec succès !");
            router.push("/admin/projects");
            router.refresh();
        } catch (error) {
            toast.error("Impossible de sauvegarder le projet.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/projects">
                        <Button variant="ghost" size="icon" className="rounded-xl h-12 w-12 border-2">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black tracking-tighter">Nouveau <span className="text-primary italic">Projet</span></h1>
                        <p className="text-muted-foreground text-sm font-medium italic">Documentez une nouvelle initiative de l'association.</p>
                    </div>
                </div>
                <Button
                    type="submit"
                    form="project-form"
                    disabled={isLoading}
                    className="rounded-2xl h-14 px-8 font-black uppercase tracking-widest shadow-xl shadow-primary/20 gap-3"
                >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    Enregistrer le projet
                </Button>
            </div>

            <form id="project-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-card border-2 border-border/50 rounded-[2.5rem] p-8 md:p-10 space-y-8 shadow-sm">
                        <div className="flex items-center justify-between border-b pb-6">
                            <div className="flex bg-muted p-1 rounded-2xl">
                                <button type="button" onClick={() => setActiveTab("write")} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeTab === "write" ? "bg-background shadow-sm text-primary" : "text-muted-foreground")}>
                                    <div className="flex items-center gap-2"><FileText size={14} /> Écrire</div>
                                </button>
                                <button type="button" onClick={() => setActiveTab("preview")} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeTab === "preview" ? "bg-background shadow-sm text-primary" : "text-muted-foreground")}>
                                    <div className="flex items-center gap-2"><Eye size={14} /> Aperçu</div>
                                </button>
                            </div>
                        </div>

                        <>
                            {activeTab === "write" ? (
                                <div key="write" className="space-y-8">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Titre du projet</Label>
                                        <Input
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="Ex: Construction d'un centre de santé"
                                            className="h-16 text-xl rounded-2xl bg-muted/30 border-transparent focus:border-primary/30 font-black tracking-tight"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Résumé (Excerpt)</Label>
                                        <Textarea
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                            placeholder="Court résumé du projet..."
                                            className="min-h-[100px] rounded-2xl bg-muted/30 border-transparent focus:border-primary/30 font-medium p-6"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Description détaillée</Label>
                                        <Textarea
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            placeholder="Détails du projet..."
                                            className="min-h-[400px] rounded-[2rem] bg-muted/30 border-transparent focus:border-primary/30 font-medium p-8 leading-relaxed"
                                            required
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div key="preview" className="space-y-8 prose prose-slate max-w-none">
                                    {formData.cover && <img src={formData.cover} alt="Preview" className="rounded-3xl w-full aspect-video object-cover" />}
                                    <h1 className="font-black italic">{formData.title || "Titre du projet"}</h1>
                                    <p className="text-xl font-medium italic border-l-4 border-primary/20 pl-6">{formData.excerpt}</p>
                                    <div dangerouslySetInnerHTML={{ __html: parseMarkdown(formData.content) }} />
                                </div>
                            )}
                        </>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-card border-2 border-border/50 rounded-[2.5rem] p-8 space-y-8 shadow-sm">
                        <h3 className="text-xs font-black uppercase tracking-widest border-b pb-4">Configuration</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">Statut</Label>
                                <div className="flex flex-col gap-2">
                                    {["ongoing", "completed", "planned"].map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, status: s })}
                                            className={cn(
                                                "py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2",
                                                formData.status === s ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" : "bg-muted border-transparent text-muted-foreground hover:border-muted-foreground/20"
                                            )}
                                        >
                                            {s === "ongoing" ? "En cours" : s === "completed" ? "Terminé" : "Prévu"}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60 flex items-center gap-2"><ImageIcon size={12} /> Image (URL)</Label>
                                <Input value={formData.cover} onChange={(e) => setFormData({ ...formData, cover: e.target.value })} placeholder="URL de l'image..." className="h-12 rounded-xl bg-muted/30" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60 flex items-center gap-2"><CalendarIcon size={12} /> Date de début</Label>
                                <Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="h-12 rounded-xl bg-muted/30" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
