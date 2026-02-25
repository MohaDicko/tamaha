
"use client";

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
    Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockMessages = [
    {
        id: 1,
        name: "Moussa Sarr",
        email: "m.sarr@ongsahel.org",
        subject: "Demande de partenariat santé",
        message: "Bonjour, nous sommes une ONG basée à Dakar et nous suivons vos actions à Matam. Nous aimerions discuter d'une collaboration pour le prochain forage...",
        date: "Aujourd'hui, 10:45",
        read: false
    },
    {
        id: 2,
        name: "Sophie Lefebvre",
        email: "sophie.l@collectif-espoire.fr",
        subject: "Proposition de don de matériel scolaire",
        message: "Nous disposons d'un stock important de cahiers et stylos que nous aimerions envoyer au Sénégal. Comment procéder pour l'acheminement ?",
        date: "Hier, 16:30",
        read: true
    },
    {
        id: 3,
        name: "Amadou Touré",
        email: "amadou.t@gmail.com",
        subject: "Candidature bénévolat",
        message: "Je suis infirmier de métier et je souhaiterais donner de mon temps lors de vos missions sanitaires. Je serai disponible en Juillet...",
        date: "24 Fév, 09:15",
        read: true
    }
];

export default function AdminMessagesPage() {
    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter">Messages & <span className="text-primary italic">Contacts</span></h1>
                    <p className="text-muted-foreground text-sm font-medium">Répondez aux demandes des donateurs et partenaires.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-12 px-6 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-green-600">3 Nouveaux Messages</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input placeholder="Rechercher par nom, email..." className="h-14 pl-12 rounded-2xl bg-card border-2 border-border/50 focus:border-primary/20 transition-all font-bold" />
                </div>
                <Button variant="outline" className="h-14 rounded-2xl border-2 px-8 font-black uppercase tracking-widest text-[10px] gap-2">
                    <Filter size={16} /> Filtres
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {mockMessages.map((msg, i) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
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
                                        {msg.name.charAt(0)}
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-black tracking-tight">{msg.name}</p>
                                        <p className="text-[10px] text-muted-foreground font-medium truncate max-w-[150px]">{msg.email}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                        <Clock size={12} /> {msg.date}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                                        <CheckCircle2 size={12} /> {msg.read ? "Lu" : "Non lu"}
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-black tracking-tight italic underline decoration-primary/20 underline-offset-8">
                                        {msg.subject}
                                    </h3>
                                    <p className="text-muted-foreground text-sm font-medium leading-relaxed italic">
                                        "{msg.message}"
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 pt-4">
                                    <Button size="sm" className="rounded-xl h-10 px-6 font-black uppercase tracking-widest text-[9px] gap-2">
                                        <Mail size={12} /> Répondre
                                    </Button>
                                    <Button variant="ghost" size="sm" className="rounded-xl h-10 px-6 font-black uppercase tracking-widest text-[9px] text-muted-foreground hover:text-destructive hover:bg-destructive/5">
                                        <Trash2 size={12} /> Archiver
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

import { cn } from "@/lib/utils";
