"use client";

import { motion } from "framer-motion";
import { Globe, Users } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

const locations = [
    {
        id: "matam",
        name: "Matam",
        country: "Sénégal",
        status: "Actif",
        details: "Programmes de forages et soutien sanitaire communautaire."
    },
    {
        id: "podor",
        name: "Podor",
        country: "Sénégal",
        status: "Actif",
        details: "Lutte contre la désertification et reboisement local."
    },
    {
        id: "niamana",
        name: "Niamana",
        country: "Mali",
        status: "Extension",
        details: "Éducation et hygiène scolaire pour les jeunes."
    },
    {
        id: "thiaroye",
        name: "Thiaroye",
        country: "Sénégal",
        status: "Actif",
        details: "Soutien à l'autonomie des femmes et protection sociale."
    }
];

export function ImpactMap() {
    const [activeLocation, setActiveLocation] = useState(0);

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <Container>
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Left: Content */}
                    <div className="lg:w-1/3 xl:w-1/4 space-y-8">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-[10px] font-bold uppercase tracking-widest text-primary"
                            >
                                <Globe size={12} /> Présence Régionale
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-slate-900 leading-[1.1]">
                                Nos Zones <br />
                                <span className="text-primary italic">D'Intervention</span>
                            </h2>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                Nous concentrons nos efforts là où les besoins sont les plus critiques, en travaillant main dans la main avec les communautés locales.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {locations.map((loc, i) => (
                                <motion.div
                                    key={i}
                                    className={cn(
                                        "p-5 rounded-2xl border transition-all cursor-pointer",
                                        activeLocation === i
                                            ? "bg-white border-primary shadow-lg shadow-primary/5 translate-x-1"
                                            : "bg-transparent border-slate-200 text-slate-400 hover:border-slate-300"
                                    )}
                                    onClick={() => setActiveLocation(i)}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className={cn("font-bold text-xs uppercase tracking-tight", activeLocation === i ? "text-slate-900" : "")}>{loc.name}</h3>
                                        <span className="text-[9px] font-bold text-primary">{loc.status}</span>
                                    </div>
                                    <p className="text-[11px] font-medium leading-tight">{loc.details}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Map Visual */}
                    <div className="flex-1 w-full relative aspect-[16/10] bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden p-8 flex items-center justify-center">
                        <div className="absolute inset-0 bg-slate-50/20" />

                        {/* Map SVG */}
                        <svg viewBox="0 0 800 500" className="w-full h-full relative z-10 opacity-80">
                            <path d="M100,200 L180,150 L250,180 L280,300 L200,350 L120,320 Z" className="fill-slate-100 stroke-slate-200" strokeWidth="2" />
                            <path d="M280,300 L350,150 L500,100 L650,200 L600,400 L400,450 Z" className="fill-slate-50 stroke-slate-200" strokeWidth="2" />

                            {locations.map((loc, i) => {
                                const x = 200 + i * 120;
                                const y = 250 + (i % 2 === 0 ? -40 : 40);
                                return (
                                    <g key={i} className="cursor-pointer" onClick={() => setActiveLocation(i)}>
                                        <circle
                                            cx={x} cy={y}
                                            r={activeLocation === i ? 10 : 6}
                                            className={cn("transition-all duration-500", activeLocation === i ? "fill-primary" : "fill-primary/40")}
                                        />
                                        {activeLocation === i && (
                                            <motion.circle
                                                cx={x} cy={y} r={20}
                                                className="fill-primary/20"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: [1, 1.5, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        )}
                                    </g>
                                );
                            })}
                        </svg>

                        {/* Labels Overlay */}
                        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end border-t border-slate-100 pt-6">
                            <div className="flex gap-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Collaborateurs</p>
                                        <p className="text-xl font-black text-slate-900 leading-none">25+</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-900 text-white text-[9px] font-bold px-4 py-2 rounded-xl uppercase tracking-widest">
                                Mission Localisée
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
