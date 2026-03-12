"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Users,
    MessageSquare,
    TrendingUp,
    Plus,
    ArrowRight,
    Clock,
    Calendar,
    FileText,
    Banknote,
    Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ActivityItem = {
    type: string;
    title: string;
    user: string;
    date: string;
    status: string;
};

type StatsData = {
    messagesCount: number;
    donationsSum: number;
    newsletterCount: number;
    visits: number;
};

export default function AdminPage() {
    const [statsData, setStatsData] = useState<StatsData | null>(null);
    const [activityData, setActivityData] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/admin/stats");
                const data = await res.json();
                if (data.stats) {
                    setStatsData(data.stats);
                    setActivityData(data.activity || []);
                }
            } catch (error) {
                console.error("Failed to load stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const stats = [
        {
            label: "Messages Non Lus",
            value: loading ? "—" : `${statsData?.messagesCount ?? 0}`,
            badge: statsData?.messagesCount ? "Urgent" : "OK",
            badgeColor: statsData?.messagesCount ? "text-amber-600 bg-amber-500/10" : "text-muted-foreground bg-muted",
            icon: MessageSquare,
            iconColor: "text-blue-500",
            href: "/admin/messages",
            gradient: "from-blue-500/10 to-transparent"
        },
        {
            label: "Dons Validés",
            value: loading ? "—" : `${(statsData?.donationsSum ?? 0).toLocaleString("fr-FR")} FCFA`,
            badge: "Impact",
            badgeColor: "text-primary bg-primary/10",
            icon: TrendingUp,
            iconColor: "text-primary",
            href: "/admin/donations",
            gradient: "from-primary/10 to-transparent"
        },
        {
            label: "Abonnés Newsletter",
            value: loading ? "—" : `${statsData?.newsletterCount ?? 0}`,
            badge: "Communauté",
            badgeColor: "text-orange-500 bg-orange-500/10",
            icon: Users,
            iconColor: "text-orange-500",
            href: null,
            gradient: "from-orange-500/10 to-transparent"
        },
        {
            label: "Visites Mensuelles",
            value: loading ? "—" : "~12 450",
            badge: "Audience",
            badgeColor: "text-purple-600 bg-purple-500/10",
            icon: TrendingUp,
            iconColor: "text-purple-500",
            href: null,
            gradient: "from-purple-500/10 to-transparent"
        },
    ];

    const quickActions = [
        {
            icon: Plus,
            label: "Nouvel Article",
            description: "Actualité terrain",
            href: "/admin/posts/new",
            color: "bg-primary/10 text-primary"
        },
        {
            icon: Sparkles,
            label: "Nouveau Projet",
            description: "Action humanitaire",
            href: "/admin/projects/new",
            color: "bg-amber-500/10 text-amber-600"
        },
        {
            icon: MessageSquare,
            label: "Voir Messages",
            description: "Support & Contact",
            href: "/admin/messages",
            color: "bg-blue-500/10 text-blue-500"
        },
    ];

    return (
        <div className="space-y-12">
            {/* ── Welcome Section ── */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-5xl font-black tracking-tighter"
                    >
                        Tableau de <span className="text-primary italic">Bord</span> 👋
                    </motion.h1>
                    <p className="text-muted-foreground font-medium text-lg">
                        Bienvenue, <span className="text-foreground font-black">Admin</span>. Voici l'état de l'association aujourd'hui.
                    </p>
                </div>
                <div className="flex items-center gap-2 px-5 py-2.5 bg-card border-2 border-border/50 rounded-2xl shadow-soft">
                    <Calendar size={16} className="text-primary" />
                    <span className="text-[11px] font-black uppercase tracking-widest">
                        {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                    </span>
                </div>
            </section>

            {/* ── Stats Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const card = (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={cn(
                                "relative p-8 bg-card border-2 border-border/50 rounded-[2.5rem] overflow-hidden transition-all duration-300 group hover:border-primary/30 hover:shadow-premium cursor-pointer",
                                "before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-0 group-hover:before:opacity-100 before:transition-opacity",
                                stat.gradient && `before:${stat.gradient}`
                            )}
                        >
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className={cn("p-4 rounded-2xl bg-muted group-hover:scale-110 transition-transform", stat.iconColor)}>
                                        <stat.icon size={22} strokeWidth={2.5} />
                                    </div>
                                    <span className={cn("text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest", stat.badgeColor)}>
                                        {stat.badge}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-3xl font-black tracking-tighter italic group-hover:translate-x-1 transition-transform">{stat.value}</h3>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                    return stat.href ? <Link key={i} href={stat.href}>{card}</Link> : <div key={i}>{card}</div>;
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ── Activités Récentes ── */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <h3 className="text-xs font-black uppercase tracking-[0.3em]">Activités Récentes</h3>
                        </div>
                        <Link href="/admin/messages">
                            <Button variant="link" className="text-[10px] font-black uppercase tracking-widest p-0 h-auto group text-primary">
                                Voir Tout <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    <div className="bg-card border-2 border-border/50 rounded-[3rem] overflow-hidden shadow-soft min-h-[400px]">
                        {loading ? (
                            <div className="flex justify-center items-center h-[400px]">
                                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : activityData.length === 0 ? (
                            <div className="flex flex-col justify-center items-center h-[400px] text-muted-foreground gap-6">
                                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                                    <Clock size={40} className="opacity-20" />
                                </div>
                                <p className="font-black uppercase tracking-widest text-xs">Aucune activité récente</p>
                            </div>
                        ) : (
                            activityData.map((activity, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "p-8 flex flex-col md:flex-row md:items-center justify-between hover:bg-muted/30 transition-all gap-6",
                                        i !== activityData.length - 1 ? "border-b border-border/40" : ""
                                    )}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner",
                                            activity.type === "post" ? "bg-primary/10 text-primary" : "bg-blue-500/10 text-blue-500"
                                        )}>
                                            {activity.type === "post" ? <FileText size={20} /> : <MessageSquare size={20} />}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-base font-black tracking-tight line-clamp-1 group-hover:text-primary transition-colors">{activity.title}</p>
                                            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.15em]">
                                                {activity.user} &bull; {new Date(activity.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={cn(
                                        "text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap w-fit shadow-sm",
                                        activity.status === "Publié" || activity.status === "Lu"
                                            ? "bg-green-500/10 text-green-600 border border-green-500/20"
                                            : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                                    )}>
                                        {activity.status}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* ── Actions Rapides ── */}
                <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] px-2">Raccourcis</h3>
                    <div className="grid gap-4">
                        {quickActions.map((action, i) => (
                            <Link key={i} href={action.href}>
                                <motion.button
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="w-full p-6 text-left bg-card border-2 border-border/50 rounded-[2.5rem] hover:border-primary/30 transition-all group flex items-center justify-between shadow-soft hover:shadow-premium"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={cn("p-4 rounded-2xl transition-all group-hover:rotate-6", action.color)}>
                                            <action.icon size={22} strokeWidth={2.5} />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[11px] font-black uppercase tracking-widest">{action.label}</p>
                                            <p className="text-[9px] text-muted-foreground font-medium">{action.description}</p>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                        <ArrowRight size={14} className=" group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </motion.button>
                            </Link>
                        ))}

                        {/* ── Prochain Événement ── */}
                        <div className="mt-4 p-8 bg-black dark:bg-muted text-white rounded-[2.5rem] shadow-premium relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-2xl group-hover:bg-primary/40 transition-colors" />
                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[9px]">
                                    <Calendar size={12} /> Prochainement
                                </div>
                                <h4 className="text-xl font-black tracking-tight leading-tight">Collecte de fonds : Ramadân 2024</h4>
                                <p className="text-[10px] text-white/50 font-medium tracking-widest">SENEGAL &bull; AVRIL 2024</p>
                                <Button size="sm" variant="outline" className="w-full border-white/20 text-white hover:bg-white hover:text-black rounded-xl text-[10px] font-black uppercase tracking-widest h-10">
                                    Gérer l'événement
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
