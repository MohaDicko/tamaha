"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Heart, Droplets, Activity } from "lucide-react";
import { Container } from "@/components/layout/Container";

const stats = [
    { label: "Vies Impactées", value: 2500, suffix: "+", icon: Users, subtext: "Grâce à nos programmes de soutien communautaire" },
    { label: "Actions Santé", value: 120, suffix: "", icon: Heart, subtext: "Campagnes de sensibilisation et de dépistage" },
    { label: "Accès à l'Eau", value: 15, suffix: "", icon: Droplets, subtext: "Projets d'adduction d'eau potable en milieu rural" },
    { label: "Années d'exp.", value: 5, suffix: "", icon: Activity, subtext: "D'engagement, de terrain et de développement local" },
];

/** Compteur animé de 0 → target */
function AnimatedCounter({ target, suffix = "", duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target, duration]);

    return <span ref={ref}>{inView ? count.toLocaleString("fr-FR") : 0}{suffix}</span>;
}

export function ImpactStats() {
    return (
        <section className="py-20 md:py-28 bg-white border-y border-slate-100">
            <Container>
                {/* En-tête */}
                <div className="text-center mb-14 space-y-3">
                    <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-label"
                    >
                        Notre impact sur le terrain
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-foreground"
                    >
                        Transparence &amp; <span className="text-primary italic font-serif-display">Résultats</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="section-desc mx-auto"
                    >
                        Des chiffres concrets qui témoignent de notre engagement quotidien auprès des communautés.
                    </motion.p>
                </div>

                {/* Grille de stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ delay: i * 0.1, duration: 0.45 }}
                            className="group relative flex flex-col items-center text-center p-6 md:p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/30 hover:bg-primary hover:shadow-xl hover:shadow-primary/15 transition-all duration-400 cursor-default"
                        >
                            {/* Icône */}
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-5 group-hover:bg-white/20 transition-colors">
                                <stat.icon size={22} className="text-primary group-hover:text-white transition-colors" />
                            </div>

                            {/* Valeur animée */}
                            <p className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 group-hover:text-white transition-colors leading-none mb-2">
                                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                            </p>

                            {/* Label */}
                            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 group-hover:text-white/80 transition-colors mb-3">
                                {stat.label}
                            </p>

                            {/* Subtext — apparaît au hover */}
                            <p className="text-xs text-slate-400 leading-relaxed group-hover:text-white/65 transition-colors line-clamp-2">
                                {stat.subtext}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
