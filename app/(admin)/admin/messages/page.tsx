"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    MessageSquare,
    User,
    Calendar,
    Mail,
    Trash2,
    CheckCircle2,
    Clock,
    ArrowRight,
    Filter,
    Search,
    RefreshCcw,
    MailOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Message = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    read: boolean;
    createdAt: string;
};

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/messages");
            if (!res.ok) throw new Error("Erreur de récupération");
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            toast.error("Impossible de charger les messages");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const markAsRead = async (id: string, readStatus: boolean) => {
        try {
            const res = await fetch("/api/admin/messages", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, read: readStatus }),
            });
            if (!res.ok) throw new Error("Erreur mise à jour");

            setMessages(msgs => msgs.map(m => m.id === id ? { ...m, read: readStatus } : m));
        } catch (error) {
            toast.error("Erreur lors de la mise à jour");
        }
    };

    const deleteMessage = async (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) return;
        try {
            const res = await fetch(`/api/admin/messages?id=${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Erreur suppression");

            toast.success("Message supprimé");
            setMessages(msgs => msgs.filter(m => m.id !== id));
        } catch (error) {
            toast.error("Erreur lors de la suppression");
        }
    };

    const unreadCount = messages.filter(m => !m.read).length;

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter">Messages & <span className="text-primary italic">Contacts</span></h1>
                    <p className="text-muted-foreground text-sm font-medium">Répondez aux demandes des donateurs et partenaires.</p>
                </div>
                <div className="flex items-center gap-3">
                    {unreadCount > 0 ? (
                        <div className="h-12 px-6 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-green-600">{unreadCount} Nouveaux Messages</span>
                        </div>
                    ) : (
                        <div className="h-12 px-6 rounded-2xl bg-card border flex items-center gap-3">
                            <CheckCircle2 size={16} className="text-muted-foreground" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tout est lu</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input placeholder="Rechercher par nom, email..." className="h-14 pl-12 rounded-2xl bg-card border-2 border-border/50 focus:border-primary/20 transition-all font-bold" />
                </div>
                <Button
                    variant="outline"
                    className="h-14 rounded-2xl border-2 px-6 font-black uppercase tracking-widest text-[10px] gap-2"
                    onClick={fetchMessages}
                    disabled={loading}
                >
                    <RefreshCcw size={16} className={cn(loading && "animate-spin")} /> Rafraîchir
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            ) : messages.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground font-medium flex flex-col items-center gap-4">
                    <MailOpen size={48} className="text-muted-foreground/30" />
                    <p>Votre boîte de réception est vide.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {messages.map((msg, i) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={cn(
                                "group p-8 bg-card border-2 rounded-[2.5rem] transition-all relative overflow-hidden",
                                msg.read ? "border-border/50" : "border-primary/30 shadow-xl shadow-primary/5 bg-primary/[0.02]"
                            )}
                        >
                            {!msg.read && <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />}

                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="lg:w-72 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center font-black text-primary text-lg">
                                            {msg.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-black tracking-tight">{msg.name}</p>
                                            <a href={`mailto:${msg.email}`} className="text-[10px] text-primary font-medium truncate max-w-[150px] hover:underline block">{msg.email}</a>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                            <Clock size={12} /> {new Date(msg.createdAt).toLocaleString("fr-FR", { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        <div className={cn(
                                            "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:opacity-70 transition-opacity w-fit px-3 py-1.5 rounded-lg",
                                            msg.read ? "text-muted-foreground bg-muted" : "text-primary bg-primary/10"
                                        )} onClick={() => markAsRead(msg.id, !msg.read)}>
                                            <CheckCircle2 size={12} /> {msg.read ? "Marquer non lu" : "Marquer comme lu"}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black tracking-tight italic underline decoration-primary/20 underline-offset-8">
                                            {msg.subject}
                                        </h3>
                                        <p className="text-muted-foreground text-sm font-medium leading-relaxed italic whitespace-pre-wrap">
                                            "{msg.message}"
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 pt-4">
                                        <Button size="sm" className="rounded-xl h-10 px-6 font-black uppercase tracking-widest text-[9px] gap-2" asChild>
                                            <a href={`mailto:${msg.email}?subject=RE: ${msg.subject}`}>
                                                <Mail size={12} /> Répondre par Email
                                            </a>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="rounded-xl h-10 px-6 font-black uppercase tracking-widest text-[9px] text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                                            onClick={() => deleteMessage(msg.id)}
                                        >
                                            <Trash2 size={12} /> Supprimer
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
