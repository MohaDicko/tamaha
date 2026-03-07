"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Save,
    Image as ImageIcon,
    Tag as TagIcon,
    Video,
    FileText,
    Clock,
    User,
    Loader2,
    Eye,
    AlertTriangle,
    CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Parser Markdown simple pour la preview
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
    format: string;
    author: string;
    cover: string;
    tags: string;
    videoUrl: string;
    published: boolean;
};

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    const postId = params.id as string;

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [hasChanges, setHasChanges] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        title: "",
        excerpt: "",
        content: "",
        format: "article",
        author: "Tammaha Team",
        cover: "",
        tags: "",
        videoUrl: "",
        published: true,
    });

    // Charger les données de l'article à éditer
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/admin/posts`);
                if (!res.ok) throw new Error("Erreur");
                const data = await res.json();
                // Support both formats
                const posts = Array.isArray(data) ? data : data.posts ?? [];
                const post = posts.find((p: any) => p.id === postId);

                if (!post) {
                    toast.error("Article non trouvé");
                    router.push("/admin/posts");
                    return;
                }

                // Convertir les tags depuis JSON string ou tableau
                let tagsStr = "";
                try {
                    const parsed = typeof post.tags === "string" ? JSON.parse(post.tags) : post.tags;
                    tagsStr = Array.isArray(parsed) ? parsed.join(", ") : "";
                } catch {
                    tagsStr = "";
                }

                setFormData({
                    title: post.title || "",
                    excerpt: post.excerpt || "",
                    content: post.content || "",
                    format: post.format || "article",
                    author: post.author || "Tammaha Team",
                    cover: post.cover || "",
                    tags: tagsStr,
                    videoUrl: post.videoUrl || "",
                    published: post.published !== false,
                });
            } catch (error) {
                toast.error("Impossible de charger l'article");
            } finally {
                setIsFetching(false);
            }
        };
        fetchPost();
    }, [postId, router]);

    const updateField = (field: keyof FormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setHasChanges(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.excerpt || !formData.content) {
            toast.error("Titre, résumé et contenu sont requis.");
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch("/api/admin/posts", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: postId, ...formData }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Erreur");
            }

            toast.success("Article mis à jour !");
            setLastSaved(new Date());
            setHasChanges(false);
        } catch (error: any) {
            toast.error(error.message || "Impossible de sauvegarder.");
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
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/posts">
                        <Button variant="ghost" size="icon" className="rounded-xl h-12 w-12 border-2">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black tracking-tighter">
                            Modifier <span className="text-primary italic">l'Article</span>
                        </h1>
                        <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground">
                            {hasChanges ? (
                                <span className="flex items-center gap-1 text-orange-500">
                                    <AlertTriangle size={10} /> Modifications non sauvegardées
                                </span>
                            ) : lastSaved ? (
                                <span className="flex items-center gap-1 text-green-500">
                                    <CheckCircle2 size={10} /> Sauvegardé à {lastSaved.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 opacity-50">
                                    <Clock size={10} /> Aucune modification
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {/* Toggle publié/brouillon */}
                    <button
                        type="button"
                        onClick={() => updateField("published", !formData.published)}
                        className={cn(
                            "h-12 px-5 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest transition-all",
                            formData.published
                                ? "bg-green-500/10 border-green-500/30 text-green-600"
                                : "bg-orange-500/10 border-orange-500/30 text-orange-600"
                        )}
                    >
                        {formData.published ? "● Publié" : "○ Brouillon"}
                    </button>
                    <Button
                        type="submit"
                        form="edit-form"
                        disabled={isLoading || !hasChanges}
                        className="rounded-2xl h-14 px-8 font-black uppercase tracking-widest shadow-xl shadow-primary/20 gap-3 disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Sauvegarder
                    </Button>
                </div>
            </div>

            <form id="edit-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                {/* Zone principale */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-card border-2 border-border/50 rounded-[2.5rem] p-8 md:p-10 space-y-8 shadow-sm">
                        {/* Tabs Écrire / Aperçu */}
                        <div className="flex items-center justify-between border-b pb-6">
                            <div className="flex bg-muted p-1 rounded-2xl">
                                {(["write", "preview"] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        type="button"
                                        onClick={() => setActiveTab(tab)}
                                        className={cn(
                                            "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                            activeTab === tab ? "bg-background shadow-sm text-primary" : "text-muted-foreground"
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            {tab === "write" ? <FileText size={14} /> : <Eye size={14} />}
                                            {tab === "write" ? "Écrire" : "Aperçu"}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {activeTab === "write" ? (
                                <motion.div key="write" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-8">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Titre *</Label>
                                        <Input
                                            value={formData.title}
                                            onChange={(e) => updateField("title", e.target.value)}
                                            placeholder="Titre de l'article"
                                            className="h-16 text-xl rounded-2xl bg-muted/30 border-transparent focus:border-primary/30 font-black tracking-tight"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Résumé court *</Label>
                                        <Textarea
                                            value={formData.excerpt}
                                            onChange={(e) => updateField("excerpt", e.target.value)}
                                            placeholder="Résumé court qui apparaîtra dans la liste..."
                                            className="min-h-[100px] rounded-2xl bg-muted/30 border-transparent focus:border-primary/30 font-medium p-6"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Contenu (Markdown) *</Label>
                                        <Textarea
                                            value={formData.content}
                                            onChange={(e) => updateField("content", e.target.value)}
                                            placeholder="Rédigez le contenu de votre article ici..."
                                            className="min-h-[400px] rounded-[2rem] bg-muted/30 border-transparent focus:border-primary/30 font-medium p-8 leading-relaxed"
                                            required
                                        />
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key="preview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
                                    {formData.cover && (
                                        <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-border/50">
                                            <img src={formData.cover} alt="Aperçu cover" className="object-cover w-full h-full" />
                                        </div>
                                    )}
                                    <h1 className="text-4xl font-black tracking-tighter italic">{formData.title || "Titre de l'article"}</h1>
                                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-primary">
                                        <span>{formData.author}</span>
                                        <span className="opacity-20">•</span>
                                        <span>Aperçu</span>
                                    </div>
                                    <div className="prose prose-slate dark:prose-invert max-w-none">
                                        <p className="text-xl text-muted-foreground font-medium italic border-l-4 border-primary/20 pl-6 py-2">
                                            {formData.excerpt || "Votre résumé apparaîtra ici..."}
                                        </p>
                                        <div
                                            className="mt-8 leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: parseMarkdown(formData.content) || "<p class='text-muted-foreground'>Le contenu apparaîtra ici...</p>" }}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Sidebar Paramètres */}
                <div className="space-y-6">
                    <div className="bg-card border-2 border-border/50 rounded-[2.5rem] p-8 space-y-8 shadow-sm">
                        <h3 className="text-xs font-black uppercase tracking-widest border-b pb-4">Paramètres</h3>

                        {/* Format */}
                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                                <FileText size={12} /> Format
                            </Label>
                            <div className="grid grid-cols-3 gap-2">
                                {["article", "video", "status"].map((f) => (
                                    <button
                                        key={f}
                                        type="button"
                                        onClick={() => updateField("format", f)}
                                        className={cn(
                                            "py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2",
                                            formData.format === f ? "bg-primary border-primary text-white" : "bg-muted border-transparent text-muted-foreground hover:border-muted-foreground/20"
                                        )}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {formData.format === "video" && (
                            <div className="space-y-2 animate-in slide-in-from-top duration-200">
                                <Label className="text-[10px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                                    <Video size={12} /> URL Vidéo (YouTube)
                                </Label>
                                <Input
                                    value={formData.videoUrl}
                                    onChange={(e) => updateField("videoUrl", e.target.value)}
                                    placeholder="https://youtube.com/..."
                                    className="h-12 rounded-xl bg-muted/30 border-transparent focus:border-primary/30 font-medium"
                                />
                            </div>
                        )}

                        {/* Image de couverture */}
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                                <ImageIcon size={12} /> Image de Couverture (URL)
                            </Label>
                            <Input
                                value={formData.cover}
                                onChange={(e) => updateField("cover", e.target.value)}
                                placeholder="https://images.unsplash..."
                                className="h-12 rounded-xl bg-muted/30 border-transparent focus:border-primary/30 font-medium"
                            />
                            {formData.cover && (
                                <div className="aspect-video rounded-xl overflow-hidden border">
                                    <img src={formData.cover} alt="Cover preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>

                        {/* Tags */}
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                                <TagIcon size={12} /> Tags (séparés par virgules)
                            </Label>
                            <Input
                                value={formData.tags}
                                onChange={(e) => updateField("tags", e.target.value)}
                                placeholder="Santé, Éducation, Sénégal"
                                className="h-12 rounded-xl bg-muted/30 border-transparent focus:border-primary/30 font-medium"
                            />
                            {/* Preview des tags */}
                            {formData.tags && (
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {formData.tags.split(",").map((tag, i) => tag.trim() && (
                                        <span key={i} className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-primary/10 text-primary rounded-full">
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Auteur */}
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                                <User size={12} /> Auteur
                            </Label>
                            <Input
                                value={formData.author}
                                onChange={(e) => updateField("author", e.target.value)}
                                className="h-12 rounded-xl bg-muted/30 border-transparent focus:border-primary/30 font-medium"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
