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
            badge: statsData?.messagesCount ? "Nouveau" : "OK",
            badgeColor: statsData?.messagesCount ? "text-green-500 bg-green-500/10" : "text-muted-foreground bg-muted",
            icon: MessageSquare,
            iconColor: "text-blue-500",
            href: "/admin/messages",
        },
        {
            label: "Dons Validés",
            value: loading ? "—" : `${(statsData?.donationsSum ?? 0).toLocaleString("fr-FR")} FCFA`,
            badge: "Total",
            badgeColor: "text-primary bg-primary/10",
            icon: TrendingUp,
            iconColor: "text-primary",
            href: "/admin/donations",
        },
        {
            label: "Abonnés Newsletter",
            value: loading ? "—" : `${statsData?.newsletterCount ?? 0}`,
            badge: "Total",
            badgeColor: "text-orange-500 bg-orange-500/10",
            icon: Users,
            iconColor: "text-orange-500",
            href: null,
        },
        {
            label: "Visites Estimées",
            value: loading ? "—" : "~12 450",
            badge: "30 jours",
            badgeColor: "text-muted-foreground bg-muted",
            icon: TrendingUp,
            iconColor: "text-purple-500",
            href: null,
        },
    ];

    // ✅ Actions rapides avec hrefs corrects
    const quickActions = [
        {
            icon: Plus,
            label: "Nouvel Article",
            description: "Partager une actualité du terrain",
            href: "/admin/posts/new",
        },
        {
            icon: FileText,
            label: "Voir les Messages",
            description: `${statsData?.messagesCount ?? 0} message${(statsData?.messagesCount ?? 0) !== 1 ? "s" : ""} non lu${(statsData?.messagesCount ?? 0) !== 1 ? "s" : ""}`,
            href: "/admin/messages",
        },
        {
            icon: Banknote,
            label: "Gérer les Dons",
            description: "Valider les promesses en attente",
            href: "/admin/donations",
        },
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
                    Tableau de <span className="text-primary italic">Bord</span> 👋
                </motion.h1>
                <p className="text-muted-foreground font-medium">
                    Vue d'ensemble de l'activité Tammaha — {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}.
                </p>
            </section>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const card = (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 bg-card border-2 border-border/50 rounded-[2rem] hover:border-primary/20 transition-all group cursor-pointer"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-2xl bg-muted group-hover:bg-primary/10 transition-colors ${stat.iconColor}`}>
                                    <stat.icon size={20} />
                                </div>
                                <span className={`text-[10px] font-black px-2 py-1 rounded-full ${stat.badgeColor}`}>
                                    {stat.badge}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-3xl font-black tracking-tighter italic">{stat.value}</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                            </div>
                        </motion.div>
                    );
                    return stat.href ? <Link key={i} href={stat.href}>{card}</Link> : <div key={i}>{card}</div>;
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Activités Récentes */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em]">Activités Récentes</h3>
                        <Link href="/admin/messages">
                            <Button variant="link" className="text-[10px] font-black uppercase tracking-widest p-0 h-auto">
                                Voir tout
                            </Button>
                        </Link>
                    </div>
                    <div className="bg-card border-2 border-border/50 rounded-[2.5rem] overflow-hidden min-h-[300px]">
                        {loading ? (
                            <div className="flex justify-center items-center h-[300px]">
                                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : activityData.length === 0 ? (
                            <div className="flex flex-col justify-center items-center h-[300px] text-muted-foreground gap-4">
                                <Clock size={40} className="opacity-20" />
                                <p className="font-medium text-sm">Aucune activité récente.</p>
                            </div>
                        ) : (
                            activityData.map((activity, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-muted/50 transition-colors gap-4",
                                        i !== activityData.length - 1 ? "border-b" : ""
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                                            activity.type === "post" ? "bg-primary/10 text-primary" : "bg-blue-500/10 text-blue-500"
                                        )}>
                                            {activity.type === "post" ? <FileText size={16} /> : <MessageSquare size={16} />}
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-black tracking-tight line-clamp-1">{activity.title}</p>
                                            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                                                {activity.user} • {new Date(activity.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={cn(
                                        "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap w-fit",
                                        activity.status === "Publié" || activity.status === "Lu"
                                            ? "bg-green-500/10 text-green-500"
                                            : "bg-orange-500/10 text-orange-500"
                                    )}>
                                        {activity.status}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Actions Rapides */}
                <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em]">Actions Rapides</h3>
                    <div className="space-y-4">
                        {quickActions.map((action, i) => (
                            // ✅ Tous les boutons sont maintenant cliquables avec un vrai href
                            <Link key={i} href={action.href}>
                                <motion.button
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="w-full p-6 text-left bg-card border-2 border-border/50 rounded-[2rem] hover:border-primary/20 transition-all group flex items-center justify-between mb-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-muted rounded-2xl group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            <action.icon size={20} />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-black uppercase tracking-widest">{action.label}</p>
                                            <p className="text-[10px] text-muted-foreground font-medium">{action.description}</p>
                                        </div>
                                    </div>
                                    <ArrowRight size={16} className="text-muted-foreground opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </motion.button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
