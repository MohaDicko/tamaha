
"use client";

import { motion } from "framer-motion";
import { MapPin, Info, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const locations = [
    {
        id: "matam",
        name: "Matam",
        country: "Sénégal",
        coords: { x: 75, y: 35 },
        impact: "Forages & Santé locale",
        details: "Plus de 5 forages réalisés et soutien au district sanitaire."
    },
    {
        id: "podor",
        name: "Podor",
        country: "Sénégal",
        coords: { x: 50, y: 20 },
        impact: "Reboisement & Climat",
        details: "1000 arbres plantés contre la désertification."
    },
    {
        id: "niamana",
        name: "Niamana",
        country: "Mali",
        coords: { x: 85, y: 70 },
        impact: "Éducation & Hygiène",
        details: "Kits scolaires et points d'eau pour les écoles."
    },
    {
        id: "thiaroye",
        name: "Thiaroye",
        country: "Sénégal",
        coords: { x: 15, y: 55 },
        impact: "Prévention VBG",
        details: "Sensibilisation et soutien aux femmes du quartier."
    }
];

export function ImpactMap() {
    const [activeLocation, setActiveLocation] = useState(locations[0]);

    return (
        <section className="py-24 relative overflow-hidden bg-muted/30">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full -mr-1/4" />

            <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Left: Map Visualization */}
                    <div className="flex-1 w-full relative aspect-square max-w-[600px] bg-card/50 backdrop-blur-xl border-2 border-border/50 rounded-[3rem] p-12 shadow-2xl overflow-hidden group">
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                        {/* Artistic Map Background (Simplified SVG Senegal/Mali area) */}
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary/20 stroke-[0.5] opacity-40 group-hover:opacity-60 transition-opacity duration-1000">
                            <path d="M10,40 Q30,10 60,20 Q90,30 85,60 Q80,90 40,85 Q10,70 10,40" strokeDasharray="2 4" />
                            <path d="M20,50 Q40,30 70,40 Q80,60 70,80 Q50,90 30,70 Z" className="fill-primary/5" />
                        </svg>

                        {/* Hotspots */}
                        {locations.map((loc) => (
                            <button
                                key={loc.id}
                                onClick={() => setActiveLocation(loc)}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 group/pin outline-none"
                                style={{ left: `${loc.coords.x}%`, top: `${loc.coords.y}%` }}
                            >
                                <div className={cn(
                                    "relative flex items-center justify-center transition-all duration-500",
                                    activeLocation.id === loc.id ? "scale-125" : "hover:scale-110"
                                )}>
                                    <div className={cn(
                                        "absolute inset-0 rounded-full animate-ping opacity-20",
                                        activeLocation.id === loc.id ? "bg-primary scale-[2.5]" : "bg-primary/50"
                                    )} />
                                    <div className={cn(
                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center shadow-lg transition-colors",
                                        activeLocation.id === loc.id ? "bg-primary border-white" : "bg-card border-primary/40"
                                    )}>
                                        <MapPin size={12} className={activeLocation.id === loc.id ? "text-white" : "text-primary"} />
                                    </div>

                                    {/* Label on pulse */}
                                    <span className={cn(
                                        "absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full transition-all",
                                        activeLocation.id === loc.id ? "bg-primary text-white opacity-100" : "bg-card border border-border opacity-0 group-hover/pin:opacity-100"
                                    )}>
                                        {loc.name}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Right: Info Content */}
                    <div className="flex-1 space-y-8 lg:max-w-xl">
                        <div className="space-y-4">
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">Notre Impact Géographique</h2>
                            <h3 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9]">
                                Là où <span className="italic">Tamaha</span> fait la <span className="text-primary italic">différence.</span>
                            </h3>
                        </div>

                        <motion.div
                            key={activeLocation.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-card border-2 border-border/50 rounded-[2.5rem] p-10 md:p-12 space-y-6 shadow-xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16" />

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                    <MapPin size={12} className="text-primary" /> {activeLocation.country}
                                </div>
                                <h4 className="text-4xl font-black tracking-tighter italic">{activeLocation.name}</h4>
                            </div>

                            <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                                <p className="text-primary font-black uppercase tracking-widest text-xs mb-2">Impact Principal</p>
                                <p className="text-xl font-black tracking-tight">{activeLocation.impact}</p>
                            </div>

                            <p className="text-muted-foreground font-medium leading-relaxed italic text-lg">
                                "{activeLocation.details}"
                            </p>

                            <div className="pt-4 flex items-center gap-4">
                                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors group/link">
                                    Voir les projets sur place
                                    <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                </button>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-card border border-border/50 rounded-2xl space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Régions Couvertes</p>
                                <p className="text-2xl font-black italic">4+</p>
                            </div>
                            <div className="p-6 bg-card border border-border/50 rounded-2xl space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Pays Actifs</p>
                                <p className="text-2xl font-black italic">Sénégal / Mali</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
