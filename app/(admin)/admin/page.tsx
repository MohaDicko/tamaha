
"use client";

import { motion } from "framer-motion";
import {
    Users,
    MessageSquare,
    TrendingUp,
    Eye,
    Plus,
    ArrowRight,
    Clock,
    CheckCircle2,
    Calendar
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
    const stats = [
        { label: "Visites (30j)", value: "12,450", change: "+14%", icon: Eye, color: "text-blue-500" },
        { label: "Nouveaux Contacts", value: "24", change: "+8%", icon: MessageSquare, color: "text-green-500" },
        { label: "Dons Promis", value: "1,200€", change: "+22%", icon: TrendingUp, color: "text-primary" },
        { label: "Bénéficiaires", value: "2,500+", change: "+5%", icon: Users, color: "text-orange-500" },
    ];

    const recentActivity = [
        { type: "post", title: "Nouveau forage à Matam", user: "Samba", time: "Il y a 2h", status: "Publié" },
        { type: "contact", title: "Demande de partenariat - ONG Sahel", user: "Contact", time: "Il y a 5h", status: "En attente" },
        { type: "event", title: "Gala annuel 2024", user: "Admin", time: "Il y a 1 jour", status: "Modifié" },
    ];

    return (
        <div className="space-y-12">
            {/* Welcome Section */}
            <section className="space-y-2">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl font-black tracking-tighter"
                >
                    Bon retour, <span className="text-primary italic">L'Administrateur</span> 👋
                </motion.h1>
                <p className="text-muted-foreground font-medium">Voici ce qu'il s'est passé sur Tamaha depuis votre dernière visite.</p>
            </section>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 bg-card border-2 border-border/50 rounded-[2rem] hover:border-primary/20 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl bg-muted group-hover:bg-primary/10 transition-colors ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                            <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                                {stat.change}
                            </span>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-3xl font-black tracking-tighter italic">{stat.value}</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em]">Activités Récentes</h3>
                        <Button variant="link" className="text-[10px] font-black uppercase tracking-widest p-0 h-auto">Tout voir</Button>
                    </div>
                    <div className="bg-card border-2 border-border/50 rounded-[2.5rem] overflow-hidden">
                        {recentActivity.map((activity, i) => (
                            <div
                                key={i}
                                className={`p-6 flex items-center justify-between hover:bg-muted/50 transition-colors ${i !== recentActivity.length - 1 ? 'border-b' : ''}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                                        <Clock size={18} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-black tracking-tight">{activity.title}</p>
                                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                                            Par {activity.user} • {activity.time}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${activity.status === 'Publié' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                                        }`}>
                                        {activity.status}
                                    </span>
                                    <ArrowRight size={14} className="text-muted-foreground opacity-30" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em]">Actions Rapides</h3>
                    <div className="space-y-4">
                        <Link href="/admin/posts/new">
                            <QuickActionButton icon={Plus} label="Nouvel Article" description="Partager une actu" />
                        </Link>
                        <QuickActionButton icon={Plus} label="Nouvelle Action" description="Ajouter un projet terrain" />
                        <QuickActionButton icon={Calendar} label="Nouvel Event" description="Ajouter à l'agenda" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function QuickActionButton({ icon: Icon, label, description }: { icon: any, label: string, description: string }) {
    return (
        <button className="w-full p-6 text-left bg-card border-2 border-border/50 rounded-[2rem] hover:border-primary/20 transition-all group flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-2xl group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Icon size={20} />
                </div>
                <div className="space-y-0.5">
                    <p className="text-sm font-black uppercase tracking-widest">{label}</p>
                    <p className="text-[10px] text-muted-foreground font-medium">{description}</p>
                </div>
            </div>
            <ArrowRight size={16} className="text-muted-foreground opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </button>
    );
}
