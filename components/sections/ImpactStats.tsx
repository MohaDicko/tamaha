"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Heart, Droplets, Activity, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";

const stats = [
    { label: "Bénéficiaires", value: 2500, suffix: "+", icon: Users, subtext: "Personnes ayant reçu une aide directe" },
    { label: "Campagnes", value: 120, suffix: "", icon: Heart, subtext: "Sensibilisations et dépistages réalisés" },
    { label: "Points d'Eau", value: 15, suffix: "", icon: Droplets, subtext: "Forages et adductions installés" },
    { label: "Ans de Terrain", value: 5, suffix: "", icon: Activity, subtext: "D'ancrage et de confiance locale" },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    const count = useSpring(0, {
        bounce: 0,
        duration: 3000,
    });

    const rounded = useTransform(count, (latest) => Math.floor(latest).toLocaleString("fr-FR"));

    useEffect(() => {
        if (inView) {
            count.set(target);
        }
    }, [inView, count, target]);

    return (
        <span ref={ref}>
            <motion.span>{rounded}</motion.span>
            {suffix}
        </span>
    );
}

export function ImpactStats() {
    return (
        <section className="py-24 md:py-32 bg-white relative overflow-hidden">
            {/* Background Blur Elements */}
            <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

            <Container>
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]"
                    >
                        <Sparkles size={12} className="animate-pulse" />
                        Transparence & Impact
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-foreground leading-tight tracking-tighter uppercase"
                    >
                        Chaque chiffre est une{' '}
                        <span className="text-primary italic font-serif-display lowercase">Nouvelle Vie</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg font-medium"
                    >
                        Nous mesurons notre réussite à l'évolution concrète des conditions de vie sur le terrain.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group relative flex flex-col p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-primary/40 hover:bg-white hover:shadow-premium transition-all duration-500 overflow-hidden"
                        >
                            {/* Decorative Background Icon */}
                            <stat.icon size={120} className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity group-hover:scale-110 duration-700" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-14 h-14 rounded-2xl bg-white shadow-soft flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                                    <stat.icon size={26} strokeWidth={2.5} />
                                </div>

                                <div className="mt-auto space-y-2">
                                    <h3 className="text-5xl font-black tracking-tighter text-slate-900 group-hover:text-primary transition-colors">
                                        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                                    </h3>
                                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                                        {stat.label}
                                    </p>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                        {stat.subtext}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
