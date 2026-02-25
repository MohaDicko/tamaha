
"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/Container';
import { Heart, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden bg-background">
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 50, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -120, 0],
                        x: [0, -60, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[10%] -right-[10%] w-[40%] h-[60%] rounded-full bg-secondary/20 blur-[100px]"
                />
            </div>

            <Container className="relative z-10">
                <div className="flex flex-col items-center text-center space-y-10">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/50 border border-border text-[10px] font-black uppercase tracking-[0.2em] shadow-sm"
                    >
                        <ShieldCheck size={14} className="text-primary" />
                        Association Reconnue d'Intérêt Général
                    </motion.div>

                    {/* Main Title */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9]">
                            AGIR POUR <br />
                            <span className="text-primary italic">L'AVENIR</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
                            Tamaha transforme l'espoir en <span className="text-foreground font-bold italic underline decoration-primary/40 underline-offset-4">actions concrètes</span>.
                            Santé, éducation et émancipation au cœur du Sénégal.
                        </p>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                    >
                        <Button size="lg" className="w-full sm:w-auto h-16 px-12 text-lg font-black uppercase tracking-widest rounded-full shadow-2xl shadow-primary/30 hover:scale-105 transition-transform group" asChild>
                            <Link href="/donate">
                                <Heart size={18} className="mr-2 fill-current" />
                                Soutenir
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-black uppercase tracking-widest rounded-full border-2 hover:bg-muted transition-all group" asChild>
                            <Link href="/actions">
                                Nos Projets
                                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Quick Stats Micro-Feed */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="pt-8 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-12"
                    >
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-xl font-black text-primary">2500+</span>
                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Impactés</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-xl font-black text-primary">15</span>
                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Partenaires</span>
                        </div>
                        <div className="hidden md:flex flex-col items-center gap-1">
                            <span className="text-xl font-black text-primary">0%</span>
                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Bénéfices</span>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
