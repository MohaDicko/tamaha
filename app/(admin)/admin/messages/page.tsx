"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
    MessageSquare,
    Mail,
    Trash2,
    CheckCircle2,
    Clock,
    Filter,
    Search,
    RefreshCcw,
    MailOpen,
    X,
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

type FilterStatus = "all" | "unread" | "read";

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/messages");
            if (!res.ok) throw new Error("Erreur de récupération");
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            toast.error("Impossible de charger les messages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const markAsRead = async (id: string, readStatus: boolean) => {
        // Mise à jour optimiste immédiate
        setMessages((msgs) => msgs.map((m) => (m.id === id ? { ...m, read: readStatus } : m)));
        try {
            const res = await fetch("/api/admin/messages", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, read: readStatus }),
            });
            if (!res.ok) throw new Error("Erreur");
        } catch {
            // Rollback en cas d'échec
            setMessages((msgs) => msgs.map((m) => (m.id === id ? { ...m, read: !readStatus } : m)));
            toast.error("Erreur lors de la mise à jour");
        }
    };

    const deleteMessage = async (id: string) => {
        if (!confirm("Supprimer ce message définitivement ?")) return;
        // Mise à jour optimiste
        setMessages((msgs) => msgs.filter((m) => m.id !== id));
        try {
            const res = await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Erreur suppression");
            toast.success("Message supprimé");
        } catch {
            toast.error("Erreur lors de la suppression");
            fetchMessages(); // Restaure la liste en cas d'échec
        }
    };

    // ✅ Recherche + filtre actifs
    const filteredMessages = useMemo(() => {
        return messages.filter((m) => {
            const term = searchTerm.toLowerCase();
            const matchSearch =
                !searchTerm ||
                m.name.toLowerCase().includes(term) ||
                m.email.toLowerCase().includes(term) ||
                m.subject.toLowerCase().includes(term) ||
                m.message.toLowerCase().includes(term);
            const matchStatus =
                filterStatus === "all" ||
                (filterStatus === "unread" && !m.read) ||
                (filterStatus === "read" && m.read);
            return matchSearch && matchStatus;
        });
    }, [messages, searchTerm, filterStatus]);

    const unreadCount = messages.filter((m) => !m.read).length;

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter">
                        Messages & <span className="text-primary italic">Contacts</span>
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium">
                        {messages.length} message{messages.length !== 1 ? "s" : ""} reçu{messages.length !== 1 ? "s" : ""}.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {unreadCount > 0 ? (
                        <div className="h-12 px-6 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-green-600">
                                {unreadCount} Non lu{unreadCount !== 1 ? "s" : ""}
                            </span>
                        </div>
                    ) : (
                        <div className="h-12 px-6 rounded-2xl bg-card border flex items-center gap-3">
                            <CheckCircle2 size={16} className="text-muted-foreground" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tout est lu</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Toolbar : Recherche + Filtres + Rafraîchir */}
            <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-3xl border-2 border-border/50">
                {/* Recherche */}
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                        placeholder="Rechercher par nom, email, sujet..."
                        className="h-12 pl-12 rounded-2xl bg-muted/30 border-transparent focus:border-primary/20 transition-all font-bold"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
                {/* Filtres statut */}
                <div className="flex items-center gap-2">
                    {(["all", "unread", "read"] as FilterStatus[]).map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={cn(
                                "h-12 px-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2",
                                filterStatus === s
                                    ? "bg-primary border-primary text-white"
                                    : "bg-muted border-transparent text-muted-foreground hover:border-muted-foreground/20"
                            )}
                        >
                            {s === "all" ? "Tous" : s === "unread" ? "Non lus" : "Lus"}
                        </button>
                    ))}
                    <Button
                        variant="outline"
                        className="h-12 rounded-2xl border-2 px-4 font-black uppercase tracking-widest text-[10px] gap-2"
                        onClick={fetchMessages}
                        disabled={loading}
                    >
                        <RefreshCcw size={16} className={cn(loading && "animate-spin")} />
                    </Button>
                </div>
            </div>

            {/* Liste */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            ) : filteredMessages.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground font-medium flex flex-col items-center gap-4">
                    <MailOpen size={48} className="opacity-20" />
                    <p>{searchTerm ? `Aucun résultat pour "${searchTerm}"` : "Votre boîte de réception est vide."}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredMessages.map((msg, i) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className={cn(
                                "group p-6 lg:p-8 bg-card border-2 rounded-[2rem] transition-all relative overflow-hidden",
                                msg.read ? "border-border/50" : "border-primary/30 shadow-lg shadow-primary/5 bg-primary/[0.01]"
                            )}
                        >
                            {!msg.read && <div className="absolute top-0 left-0 w-1.5 h-full bg-primary rounded-l-full" />}

                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Colonne gauche : expéditeur */}
                                <div className="lg:w-64 space-y-4 shrink-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary text-lg">
                                            {msg.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="space-y-0.5 min-w-0">
                                            <p className="text-sm font-black tracking-tight truncate">{msg.name}</p>
                                            <a
                                                href={`mailto:${msg.email}`}
                                                className="text-[11px] text-primary font-medium truncate hover:underline block"
                                            >
                                                {msg.email}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                            <Clock size={11} />
                                            {new Date(msg.createdAt).toLocaleString("fr-FR", {
                                                day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
                                            })}
                                        </div>
                                        {/* Toggle lu/non lu */}
                                        <button
                                            onClick={() => markAsRead(msg.id, !msg.read)}
                                            className={cn(
                                                "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest w-fit px-3 py-1.5 rounded-lg transition-all hover:opacity-80",
                                                msg.read ? "text-muted-foreground bg-muted" : "text-primary bg-primary/10"
                                            )}
                                        >
                                            <CheckCircle2 size={12} />
                                            {msg.read ? "Marquer non lu" : "Marquer comme lu"}
                                        </button>
                                    </div>
                                </div>

                                {/* Colonne droite : contenu */}
                                <div className="flex-1 space-y-4 min-w-0">
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-black tracking-tight">{msg.subject}</h3>
                                        <p className="text-muted-foreground text-sm font-medium leading-relaxed whitespace-pre-wrap line-clamp-4">
                                            {msg.message}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 pt-2">
                                        <Button size="sm" className="rounded-xl h-10 px-5 font-black uppercase tracking-widest text-[9px] gap-2" asChild>
                                            <a href={`mailto:${msg.email}?subject=RE: ${encodeURIComponent(msg.subject)}`}>
                                                <Mail size={12} /> Répondre
                                            </a>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="rounded-xl h-10 px-5 font-black uppercase tracking-widest text-[9px] text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                                            onClick={() => deleteMessage(msg.id)}
                                        >
                                            <Trash2 size={12} className="mr-2" /> Supprimer
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Footer stats */}
            {!loading && messages.length > 0 && (
                <div className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    {filteredMessages.length} message{filteredMessages.length !== 1 ? "s" : ""} affiché{filteredMessages.length !== 1 ? "s" : ""}
                    {filterStatus !== "all" || searchTerm ? ` (sur ${messages.length} total)` : ""}
                </div>
            )}
        </div>
    );
}
