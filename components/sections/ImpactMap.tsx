"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Globe, Users, MapPin, ChevronRight, Activity } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

const locations = [
    {
        id: "bamako",
        name: "Bamako Ville",
        country: "Mali",
        status: "Prioritaire",
        details: "Siège des actions éducatives et soutien nutritionnel d'urgence.",
        coords: { x: 480, y: 320 },
        color: "bg-primary"
    },
    {
        id: "matam",
        name: "Région de Matam",
        country: "Sénégal",
        status: "Actif",
        details: "Programmes de forages et soutien sanitaire communautaire.",
        coords: { x: 220, y: 240 },
        color: "bg-blue-500"
    },
    {
        id: "podor",
        name: "Podor",
        country: "Sénégal",
        status: "Actif",
        details: "Lutte contre la désertification et reboisement local.",
        coords: { x: 180, y: 190 },
        color: "bg-green-500"
    },
    {
        id: "niamana",
        name: "Niamana",
        country: "Mali",
        status: "Extension",
        details: "Éducation et hygiène scolaire pour les jeunes écoliers.",
        coords: { x: 550, y: 300 },
        color: "bg-amber-500"
    },
    {
        id: "dakart",
        name: "Dakar & Banlieue",
        country: "Sénégal",
        status: "Actif",
        details: "Insertion professionnelle et protection de l'enfance.",
        coords: { x: 120, y: 280 },
        color: "bg-purple-500"
    }
];

export function ImpactMap() {
    const [activeLocation, setActiveLocation] = useState(0);

    return (
        <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
            {/* Décorations de fond */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[5%] left-[-5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            <Container className="relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-stretch">

                    {/* ── COLONNE INFOS ── */}
                    <div className="lg:w-[400px] flex flex-col gap-10">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-white border border-border shadow-soft text-[10px] font-black uppercase tracking-[0.2em] text-primary"
                            >
                                <Globe size={13} className="animate-spin-slow" /> Nos Zones d'Impact
                            </motion.div>

                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-[1] uppercase">
                                Présence au <br />
                                <span className="text-primary italic font-serif-display lowercase">Sénégal &amp; Mali</span>
                            </h2>

                            <p className="text-slate-500 text-base font-medium leading-relaxed">
                                De Dakar à Bamako, nous déployons nos ressources là où l'urgence sociale et sanitaire l'exige.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            {locations.map((loc, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveLocation(i)}
                                    className={cn(
                                        "group relative p-6 rounded-[1.5rem] border-2 transition-all duration-500 text-left overflow-hidden",
                                        activeLocation === i
                                            ? "bg-white border-primary shadow-premium translate-x-3"
                                            : "bg-transparent border-slate-200/60 hover:border-slate-300 grayscale opacity-60 hover:opacity-100 hover:grayscale-0"
                                    )}
                                >
                                    {activeLocation === i && (
                                        <motion.div
                                            layoutId="active-bg"
                                            className="absolute left-0 top-0 w-1 h-full bg-primary"
                                        />
                                    )}
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className={cn("w-2 h-2 rounded-full", loc.color)} />
                                            <h3 className="font-black text-xs uppercase tracking-widest">{loc.name}</h3>
                                        </div>
                                        <span className="text-[10px] font-black text-primary/60">{loc.country}</span>
                                    </div>
                                    <p className="text-[11px] font-medium text-slate-500 leading-snug">{loc.details}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── CARTE VISUELLE ── */}
                    <div className="flex-1 min-h-[500px] lg:min-h-0 relative bg-white rounded-[3rem] border-2 border-slate-100 shadow-premium overflow-hidden group/map">

                        {/* Motif de fond (Grid) */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '30px 30px' }} />

                        {/* Top Overlay */}
                        <div className="absolute top-8 left-8 z-20">
                            <div className="flex items-center gap-4 glass bg-white/20 p-2 pr-6 rounded-2xl border border-white/40 shadow-xl">
                                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Localisation Actuelle</p>
                                    <p className="text-lg font-black text-slate-900 tracking-tight">{locations[activeLocation].name}</p>
                                </div>
                            </div>
                        </div>

                        {/* Map SVG (Simplified Senegal/Mali Concept) */}
                        <div className="absolute inset-0 flex items-center justify-center p-12">
                            <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-2xl">
                                {/* Senegal Shape Concept */}
                                <motion.path
                                    initial={{ opacity: 0, pathLength: 0 }}
                                    whileInView={{ opacity: 1, pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    d="M50,250 C80,180 150,150 200,160 C250,170 300,220 300,280 C300,340 250,380 180,390 C120,400 60,350 50,250"
                                    className="fill-slate-50 stroke-slate-200"
                                    strokeWidth="2"
                                />
                                {/* Mali Shape Concept */}
                                <motion.path
                                    initial={{ opacity: 0, pathLength: 0 }}
                                    whileInView={{ opacity: 1, pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                                    d="M300,280 C350,200 450,150 550,100 C650,50 750,80 780,200 C800,350 700,450 600,480 C500,500 400,450 300,280"
                                    className="fill-slate-50 stroke-slate-200"
                                    strokeWidth="2"
                                />

                                {/* Points de connexion */}
                                {locations.map((loc, i) => (
                                    <g key={i} className="cursor-pointer" onClick={() => setActiveLocation(i)}>
                                        {/* Point Glow */}
                                        <AnimatePresence>
                                            {activeLocation === i && (
                                                <motion.circle
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: [1, 2, 1], opacity: [0.2, 0.4, 0.2] }}
                                                    exit={{ scale: 0, opacity: 0 }}
                                                    transition={{ duration: 3, repeat: Infinity }}
                                                    cx={loc.coords.x} cy={loc.coords.y} r={25}
                                                    className="fill-primary/20"
                                                />
                                            )}
                                        </AnimatePresence>

                                        {/* Main Point */}
                                        <motion.circle
                                            cx={loc.coords.x} cy={loc.coords.y}
                                            r={activeLocation === i ? 12 : 6}
                                            className={cn("transition-all duration-500", activeLocation === i ? "fill-primary" : "fill-slate-300 hover:fill-slate-400")}
                                            animate={activeLocation === i ? { r: 12 } : { r: 6 }}
                                        />

                                        {/* Label Tag on Map */}
                                        {activeLocation === i && (
                                            <motion.g
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <rect
                                                    x={loc.coords.x + 20} y={loc.coords.y - 45}
                                                    width="120" height="34" rx="10"
                                                    className="fill-slate-900 shadow-xl"
                                                />
                                                <text
                                                    x={loc.coords.x + 35} y={loc.coords.y - 23}
                                                    className="fill-white text-[10px] font-black uppercase tracking-widest"
                                                >
                                                    {loc.name}
                                                </text>
                                            </motion.g>
                                        )}
                                    </g>
                                ))}
                            </svg>
                        </div>

                        {/* Bottom Stats Overlay */}
                        <div className="absolute bottom-8 left-8 right-8 z-20 flex justify-between items-center pointer-events-none">
                            <div className="flex gap-10 glass bg-white/40 p-6 rounded-[2rem] border border-white/60 shadow-2xl backdrop-blur-md">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Collaborateurs</p>
                                        <p className="text-xl font-black text-slate-900 tracking-tighter">45+</p>
                                    </div>
                                </div>
                                <div className="w-px h-10 bg-slate-200" />
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                                        <Activity size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Actions / Mois</p>
                                        <p className="text-xl font-black text-slate-900 tracking-tighter">12</p>
                                    </div>
                                </div>
                            </div>

                            <button className="h-16 w-16 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-primary transition-colors shadow-xl group pointer-events-auto">
                                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
}
