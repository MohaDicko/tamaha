"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Users, Stethoscope, Activity, MessageSquare, Droplets, Brain, Sparkles, HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";

const interventions = [
    {
        title: "Dépistage & Santé",
        description: "Organisation de campagnes de dépistage et de sensibilisation sur de nombreuses maladies chroniques.",
        icon: Stethoscope,
        color: "text-rose-500",
        bgColor: "bg-rose-500/10",
        border: "border-rose-500/20"
    },
    {
        title: "Causeries Éducatives",
        description: "Sessions d'échanges sur les VBG et les dangers des psychotropes auprès des jeunes.",
        icon: MessageSquare,
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
        border: "border-amber-500/20"
    },
    {
        title: "Hygiène & Prévention",
        description: "Promotion et éducation à l'hygiène corporelle et intime pour un bien-être durable.",
        icon: Droplets,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        border: "border-blue-500/20"
    },
    {
        title: "Soutien Moral",
        description: "Accompagnement psychologique et écoute active pour aider à surmonter les épreuves.",
        icon: Brain,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        border: "border-purple-500/20"
    },
];

export function Interventions() {
    return (
        <section className="py-24 md:py-32 bg-white relative overflow-hidden">
            <Container>
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <div className="max-w-2xl space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-slate-50 border border-slate-200 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500"
                        >
                            <HeartPulse size={13} className="text-primary" />
                            Engagement Terrain
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-foreground leading-tight tracking-tighter uppercase"
                        >
                            Nos Domaines d'{' '}
                            <span className="text-primary italic font-serif-display lowercase">Intervention</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg font-medium max-w-sm md:text-right"
                    >
                        Des actions concrètes pour transformer durablement le quotidien des populations vulnérables.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {interventions.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={cn(
                                "group relative p-10 rounded-[2.5rem] bg-white border-2 border-slate-100 transition-all duration-500 hover:border-primary/20 hover:shadow-premium overflow-hidden",
                                i % 2 !== 0 ? "lg:translate-y-8" : ""
                            )}
                        >
                            <div className={cn(
                                "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-soft",
                                item.bgColor, item.color
                            )}>
                                <item.icon size={30} strokeWidth={2.5} />
                            </div>

                            <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight uppercase">{item.title}</h3>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">{item.description}</p>

                            <div className="pt-6 border-t border-slate-50 group-hover:border-primary/10 transition-colors">
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                    En savoir plus <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>

            {/* Décoration de fond */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[500px] bg-primary/5 blur-[120px] -z-10 pointer-events-none" />
        </section>
    );
}

function ChevronRight({ size, className }: { size: number; className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size} height={size}
            viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            className={className}
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}
