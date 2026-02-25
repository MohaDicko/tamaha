"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

export function CTA() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <Container>
                <div className="relative rounded-[3rem] bg-primary p-12 md:p-24 overflow-hidden text-center text-white shadow-2xl shadow-primary/20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -mr-48 -mt-48" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 blur-[80px] rounded-full -ml-32 -mb-32" />

                    <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                        <div className="space-y-6">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-tight"
                            >
                                Devenez Acteur du <br />
                                <span className="text-secondary italic">Changement</span>
                            </motion.h2>
                            <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed">
                                Votre solidarité est le moteur de nos actions. Ensemble, bâtissons un avenir où chaque communauté est autonome et épanouie.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Button size="lg" className="h-16 px-10 text-xs font-bold uppercase tracking-widest rounded-full bg-white text-primary hover:bg-slate-50 transition-all shadow-xl" asChild>
                                <Link href="/donate">Faire un Don</Link>
                            </Button>
                            <Button variant="outline" size="lg" className="h-16 px-10 text-xs font-bold uppercase tracking-widest rounded-full border-white/20 text-white hover:bg-white/10" asChild>
                                <Link href="/contact">Nous Contacter</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
