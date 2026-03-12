"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
    AlertTriangle,
    CheckCircle2,
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

type FormData = {
    title: string;
    excerpt: string;
    content: string;
    status: string;
    cover: string;
    date: string;
    published: boolean;
};

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id as string;

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [hasChanges, setHasChanges] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        title: "",
        excerpt: "",
        content: "",
        status: "ongoing",
        cover: "",
        date: "",
        published: true,
    });

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/admin/projects`);
                if (!res.ok) throw new Error("Erreur");
                const data = await res.json();
                const project = data.find((p: any) => p.id === projectId);

                if (!project) {
                    toast.error("Projet non trouvé");
                    router.push("/admin/projects");
                    return;
                }

                setFormData({
                    title: project.title || "",
                    excerpt: project.excerpt || "",
                    content: project.content || "",
                    status: project.status || "ongoing",
                    cover: project.cover || "",
                    date: project.date ? new Date(project.date).toISOString().split('T')[0] : "",
                    published: project.published !== false,
                });
            } catch (error) {
                toast.error("Impossible de charger le projet");
            } finally {
                setIsFetching(false);
            }
        };
        fetchProject();
    }, [projectId, router]);

    const updateField = (field: keyof FormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setHasChanges(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch("/api/admin/projects", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: projectId, ...formData }),
            });

            if (!response.ok) throw new Error("Erreur");

            toast.success("Projet mis à jour !");
            setLastSaved(new Date());
            setHasChanges(false);
        } catch (error) {
            toast.error("Impossible de sauvegarder.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

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
                        <h1 className="text-3xl font-black tracking-tighter">Modifier le <span className="text-primary italic">Projet</span></h1>
                        <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground">
                            {hasChanges ? <span className="text-orange-500 flex items-center gap-1"><AlertTriangle size={10} /> Non sauvegardé</span> : lastSaved ? <span className="text-green-500 flex items-center gap-1"><CheckCircle2 size={10} /> Sauvegardé</span> : <span className="opacity-50 flex items-center gap-1"><Clock size={10} /> Aucune modif</span>}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button type="button" onClick={() => updateField("published", !formData.published)} className={cn("h-12 px-5 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest transition-all", formData.published ? "bg-green-500/10 border-green-500/30 text-green-600" : "bg-orange-500/10 border-orange-500/30 text-orange-600")}>
                        {formData.published ? "● Public" : "○ Brouillon"}
                    </button>
                    <Button type="submit" form="edit-form" disabled={isLoading || !hasChanges} className="rounded-2xl h-14 px-8 font-black uppercase tracking-widest shadow-xl shadow-primary/20 gap-3">
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Sauvegarder
                    </Button>
                </div>
            </div>

            <form id="edit-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-card border-2 border-border/50 rounded-[2.5rem] p-8 md:p-10 space-y-8 shadow-sm">
                        <div className="flex items-center justify-between border-b pb-6">
                            <div className="flex bg-muted p-1 rounded-2xl">
                                {(["write", "preview"] as const).map((tab) => (
                                    <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeTab === tab ? "bg-background shadow-sm text-primary" : "text-muted-foreground")}>
                                        <div className="flex items-center gap-2">{tab === "write" ? <FileText size={14} /> : <Eye size={14} />} {tab === "write" ? "Modifier" : "Aperçu"}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <>
                            {activeTab === "write" ? (
                                <div key="write" className="space-y-8">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Titre</Label>
                                        <Input value={formData.title} onChange={(e) => updateField("title", e.target.value)} className="h-16 text-xl rounded-2xl bg-muted/30" required />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Résumé</Label>
                                        <Textarea value={formData.excerpt} onChange={(e) => updateField("excerpt", e.target.value)} className="min-h-[100px] rounded-2xl bg-muted/30" required />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Contenu</Label>
                                        <Textarea value={formData.content} onChange={(e) => updateField("content", e.target.value)} className="min-h-[400px] rounded-[2rem] bg-muted/30 p-8" required />
                                    </div>
                                </div>
                            ) : (
                                <div key="preview" className="space-y-6 prose prose-slate max-w-none">
                                    {formData.cover && <img src={formData.cover} alt="Aperçu" className="rounded-3xl w-full aspect-video object-cover" />}
                                    <h1 className="font-black italic">{formData.title}</h1>
                                    <p className="text-xl font-medium italic border-l-4 border-primary/20 pl-6">{formData.excerpt}</p>
                                    <div dangerouslySetInnerHTML={{ __html: parseMarkdown(formData.content) }} />
                                </div>
                            )}
                        </>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-card border-2 border-border/50 rounded-[2.5rem] p-8 space-y-8 shadow-sm">
                        <h3 className="text-xs font-black uppercase tracking-widest border-b pb-4">Configuration</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Statut</Label>
                                <div className="flex flex-col gap-2">
                                    {["ongoing", "completed", "planned"].map((s) => (
                                        <button key={s} type="button" onClick={() => updateField("status", s)} className={cn("py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border-2", formData.status === s ? "bg-primary border-primary text-white" : "bg-muted border-transparent text-muted-foreground")}>
                                            {s === "ongoing" ? "En cours" : s === "completed" ? "Terminé" : "Prévu"}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Image (URL)</Label>
                                <Input value={formData.cover} onChange={(e) => updateField("cover", e.target.value)} className="h-12 rounded-xl bg-muted/30" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Date de début</Label>
                                <Input type="date" value={formData.date} onChange={(e) => updateField("date", e.target.value)} className="h-12 rounded-xl bg-muted/30" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
