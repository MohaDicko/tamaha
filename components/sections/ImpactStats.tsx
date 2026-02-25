"use client";

import { motion } from "framer-motion";
import { Users, Heart, Droplets, Activity } from "lucide-react";
import { Container } from "@/components/layout/Container";

const stats = [
    { label: "Vies Impactées", value: 2500, icon: Users, subtext: "Grâce à nos programmes de soutien" },
    { label: "Actions Santé", value: 120, icon: Heart, subtext: "Campagnes de sensibilisation et dépistage" },
    { label: "Accès à l'Eau", value: 15, icon: Droplets, subtext: "Projets d'adduction d'eau potable" },
    { label: "Années d'Exp.", value: 5, icon: Activity, subtext: "D'engagement et de développement" },
];

export function ImpactStats() {
    return (
        <section className="py-24 bg-white border-y border-slate-100 relative overflow-hidden">
            <Container>
                <div className="text-center mb-20 space-y-4">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary"
                    >
                        Notre Impact sur le Terrain
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-slate-900 leading-none">
                        Transparence & <span className="text-primary italic">Résultats</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col items-center text-center group hover:bg-primary transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                                <stat.icon size={32} className="text-primary" />
                            </div>
                            <div className="space-y-2">
                                <span className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 group-hover:text-white transition-colors">
                                    {stat.value}
                                </span>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-white/80 transition-colors">
                                    {stat.label}
                                </p>
                                <p className="text-xs font-medium text-slate-500 leading-relaxed italic opacity-0 group-hover:opacity-100 transition-all group-hover:text-white/60">
                                    {stat.subtext}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
