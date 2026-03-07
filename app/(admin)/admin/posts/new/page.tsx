"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Save,
    Image as ImageIcon,
    Tag as TagIcon,
    Calendar as CalendarIcon,
    Video,
    FileText,
    Clock,
    User,
    Loader2,
    Eye,
    Layout,
    Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Simple Markdown Parser (for preview)
const parseMarkdown = (text: string) => {
    return text
        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-2">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-black mt-10 mb-6">$1</h1>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/\n$/gim, '<br />')
        .replace(/\n/g, '<br />');
};

export default function NewPostPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        format: "article",
        author: "Administrateur",
        cover: "",
        tags: "",
        videoUrl: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/admin/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Erreur lors de la création");

            toast.success("Article créé avec succès !");
            router.push("/admin/posts");
            router.refresh();
        } catch (error) {
            toast.error("Impossible de sauvegarder l'article.");
        } finally {
            setIsLoading(false);
        }
    };

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
                        <h1 className="text-3xl font-black tracking-tighter">Nouvelle <span className="text-primary italic">Publication</span></h1>
                        <p className="text-muted-foreground text-sm font-medium italic">Partagez les actualités de Tammaha avec le monde.</p>
                    </div>
                </div>
                <Button
                    type="submit"
                    form="post-form"
                    disabled={isLoading}
                    className="rounded-2xl h-14 px-8 font-black uppercase tracking-widest shadow-xl shadow-primary/20 gap-3"
                >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    Publier l'article
                </Button>
            </div>


            <form id="post-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-card border-2 border-border/50 rounded-[2.5rem] p-8 md:p-10 space-y-8 shadow-sm">
                        <div className="flex items-center justify-between border-b pb-6">
                            <div className="flex bg-muted p-1 rounded-2xl">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("write")}
                                    className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeTab === "write" ? "bg-background shadow-sm text-primary" : "text-muted-foreground")}
                                >
                                    <div className="flex items-center gap-2">
                                        <FileText size={14} /> Écrire
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("preview")}
                                    className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeTab === "preview" ? "bg-background shadow-sm text-primary" : "text-muted-foreground")}
                                >
                                    <div className="flex items-center gap-2">
                                        <Eye size={14} /> Aperçu
                                    </div>
                                </button>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40">
                                <Clock size={12} /> Sauvegarde auto activée
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {activeTab === "write" ? (
                                <motion.div
                                    key="write"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-8"
                                >
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Titre de l'article</Label>
                                        <Input
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="Ex: Une nouvelle mission à Matam"
                                            className="h-16 text-xl rounded-2xl bg-muted/30 border-transparent focus:border-primary/30 font-black tracking-tight"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Résumé court</Label>
                                        <Textarea
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                            placeholder="Un court résumé qui apparaîtra dans la liste des articles..."
                                            className="min-h-[100px] rounded-2xl bg-muted/30 border-transparent focus:border-primary/30 font-medium p-6"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Contenu (Markdown supporté)</Label>
                                        <Textarea
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            placeholder="Rédigez le corps de votre article ici..."
                                            className="min-h-[400px] rounded-[2rem] bg-muted/30 border-transparent focus:border-primary/30 font-medium p-8 leading-relaxed"
                                            required
                                        />
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="preview"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-8"
                                >
                                    <div className="space-y-6">
                                        {formData.cover && (
                                            <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-border/50">
                                                <img src={formData.cover} alt="Preview" className="object-cover w-full h-full" />
                                            </div>
                                        )}
                                        <h1 className="text-4xl font-black tracking-tighter italic">{formData.title || "Titre de l'article"}</h1>
                                        <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-primary">
                                            <span>{formData.author}</span>
                                            <span className="opacity-20">•</span>
                                            <span>Aujourd'hui</span>
                                        </div>
                                        <div className="prose prose-slate dark:prose-invert max-w-none">
                                            <p className="text-xl text-muted-foreground font-medium italic border-l-4 border-primary/20 pl-6 py-2">
                                                {formData.excerpt || "Votre résumé apparaîtra ici..."}
                                            </p>
                                            <div
                                                className="mt-8 leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: parseMarkdown(formData.content) || "Le contenu de votre article apparaîtra ici..." }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                {/* Sidebar Settings */}
                <div className="space-y-8">
                    <div className="bg-card border-2 border-border/50 rounded-[2.5rem] p-8 space-y-8 shadow-sm">
                        <h3 className="text-xs font-black uppercase tracking-widest border-b pb-4">Paramètres</h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60 flex items-center gap-2">
                                    <FileText size={12} /> Format
                                </Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {["article", "video", "status"].map((f) => (
                                        <button
                                            key={f}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, format: f })}
                                            className={cn(
                                                "py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2",
                                                formData.format === f ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" : "bg-muted border-transparent text-muted-foreground hover:border-muted-foreground/20"
                                            )}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {formData.format === "video" && (
                                <div className="space-y-2 animate-in slide-in-from-top duration-300">
                                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60 flex items-center gap-2">
                                        <Video size={12} /> URL Vidéo (YouTube)
                                    </Label>
                                    <Input
                                        value={formData.videoUrl}
                                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                                        placeholder="https://youtube.com/..."
                                        className="h-12 rounded-xl bg-muted/30 border-transparent focus:border-primary/30 font-medium"
                                    />
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60 flex items-center gap-2">
                                    <ImageIcon size={12} /> Image de Couverture (URL)
                                </Label>
                                <Input
                                    value={formData.cover}
                                    onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                                    placeholder="https://images.unsplash..."
                                    className="h-12 rounded-xl bg-muted/30 border-transparent focus:border-primary/30 font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60 flex items-center gap-2">
                                    <TagIcon size={12} /> Tags (séparés par des virgules)
                                </Label>
                                <Input
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    placeholder="Santé, Éducation, Sénégal"
                                    className="h-12 rounded-xl bg-muted/30 border-transparent focus:border-primary/30 font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60 flex items-center gap-2">
                                    <User size={12} /> Auteur
                                </Label>
                                <Input
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="h-12 rounded-xl bg-muted/30 border-transparent focus:border-primary/30 font-medium"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
