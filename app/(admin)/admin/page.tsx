
"use client";

import { useState, useEffect } from "react";
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
import { cn } from "@/lib/utils";

export default function AdminPage() {
    const [statsData, setStatsData] = useState<any>(null);
    const [activityData, setActivityData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/admin/stats");
                const data = await res.json();
                if (data.stats) {
                    setStatsData(data.stats);
                    setActivityData(data.activity);
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
        { label: "Visites (30j)", value: loading ? "..." : "12,450", change: "+14%", icon: Eye, color: "text-blue-500" },
        { label: "Nouveaux Contacts", value: loading ? "..." : `${statsData?.messagesCount || 0}`, change: "Actif", icon: MessageSquare, color: "text-green-500" },
        { label: "Dons Validés", value: loading ? "..." : `${statsData?.donationsSum?.toLocaleString("fr-FR") || 0}€`, change: "Total", icon: TrendingUp, color: "text-primary" },
        { label: "Abonnés Newsletter", value: loading ? "..." : `${statsData?.newsletterCount || 0}`, change: "Total", icon: Users, color: "text-orange-500" },
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
                    <div className="bg-card border-2 border-border/50 rounded-[2.5rem] overflow-hidden min-h-[300px]">
                        {loading ? (
                            <div className="flex justify-center items-center h-full">Chargement...</div>
                        ) : activityData.length === 0 ? (
                            <div className="flex justify-center items-center h-full text-muted-foreground p-10">Aucune activité récente.</div>
                        ) : activityData.map((activity, i) => (
                            <div
                                key={i}
                                className={`p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-muted/50 transition-colors gap-4 ${i !== activityData.length - 1 ? 'border-b' : ''}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                                        <Clock size={18} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-black tracking-tight">{activity.title}</p>
                                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                                            Par {activity.user} • {new Date(activity.date).toLocaleDateString("fr-FR")}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap",
                                        activity.status === 'Publié' || activity.status === 'Lu' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                                    )}>
                                        {activity.status}
                                    </span>
                                    <ArrowRight size={14} className="text-muted-foreground opacity-30 hidden md:block" />
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
