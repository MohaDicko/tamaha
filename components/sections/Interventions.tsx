"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Users, Stethoscope, Activity, MessageCircle, Droplets, BrainHeart } from "lucide-react";

const interventions = [
    {
        title: "Dépistage & Santé",
        description: "Organisation de campagnes de dépistage et de sensibilisation sur de nombreuses maladies.",
        icon: Stethoscope,
        color: "text-rose-500",
        bgColor: "bg-rose-50",
    },
    {
        title: "Causeries Éducatives",
        description: "Sessions d'échanges sur les Violences Basées sur le Genre (VBG) et les dangers des psychotropes.",
        icon: MessageCircle,
        color: "text-amber-500",
        bgColor: "bg-amber-50",
    },
    {
        title: "Hygiène & Prévention",
        description: "Promotion et éducation à l'hygiène corporelle et intime pour un bien-être au quotidien.",
        icon: Droplets,
        color: "text-blue-500",
        bgColor: "bg-blue-50",
    },
    {
        title: "Soutien Psychologique",
        description: "Accompagnement psychologique et écoute active pour aider à surmonter les traumatismes.",
        icon: BrainHeart,
        color: "text-purple-500",
        bgColor: "bg-purple-50",
    },
];

export function Interventions() {
    return (
        <section className="py-24 bg-slate-50">
            <Container>
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest"
                    >
                        <Users size={14} />
                        Femmes, Jeunes et Adolescents
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black tracking-tight text-slate-900"
                    >
                        Nos Domaines d'<span className="text-primary italic font-serif-display">Intervention</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg leading-relaxed"
                    >
                        Nous agissons concrètement sur le terrain pour améliorer les conditions de vie, la santé physique et mentale, tout en brisant les tabous.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {interventions.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${item.bgColor} ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <item.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
