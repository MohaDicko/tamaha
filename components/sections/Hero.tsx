"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/Container';
import { ArrowRight, Sparkles, HeartHandshake } from 'lucide-react';

const stats = [
    { value: '1 500+', label: 'Bénéficiaires' },
    { value: '8', label: 'Projets actifs' },
    { value: '100%', label: 'Transparence' },
];

export function Hero() {
    return (
        <section className="relative flex items-center min-h-[100svh] pt-32 pb-20 overflow-hidden bg-background">

            {/* ── Fonds Animés & Gradients ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/30 rounded-full blur-[100px]" />
                <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[80px]" />

                {/* Patterns de points discrets */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>

            <Container className="relative z-10 w-full">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-24 items-center">

                    {/* ── COLONNE TEXTE ── */}
                    <div className="flex flex-col gap-8 text-center xl:text-left">

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex justify-center xl:justify-start"
                        >
                            <span className="section-label bg-primary/5 border-primary/20 text-primary px-5 py-2 rounded-2xl shadow-soft">
                                <Sparkles size={14} className="animate-pulse" />
                                Association Tammaha &middot; Bâtir l'avenir
                            </span>
                        </motion.div>

                        {/* Titre */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="space-y-6"
                        >
                            <h1 className="text-foreground leading-[1.1] tracking-tighter">
                                Un Engagemement pour une{' '}
                                <span className="text-primary italic font-serif-display block sm:inline">Vie Meilleure</span>
                                <br />
                                <span className="text-shimmer">au Cœur de l'Afrique.</span>
                            </h1>
                            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto xl:mx-0 font-medium">
                                Tammaha déploie des solutions durables pour l'autonomie des communautés au Sénégal et au Mali,
                                agissant concrètement pour la santé et l'éducation.
                            </p>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.25 }}
                            className="flex flex-col sm:flex-row justify-center xl:justify-start gap-4"
                        >
                            <Button
                                size="lg"
                                asChild
                                className="h-16 px-10 rounded-[1.5rem] font-black text-sm uppercase tracking-widest bg-primary text-white hover:bg-primary/90 shadow-2xl shadow-primary/30 group transition-all hover:scale-[1.03] active:scale-95"
                            >
                                <Link href="/donate">
                                    Faire un Don ❤️
                                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                asChild
                                className="h-16 px-10 rounded-[1.5rem] font-black text-sm uppercase tracking-widest border-2 border-border text-foreground hover:bg-muted transition-all active:scale-95"
                            >
                                <Link href="/actions">Découvrir nos Projets</Link>
                            </Button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="flex flex-wrap justify-center xl:justify-start gap-10 sm:gap-16 pt-10 border-t border-border/60"
                        >
                            {stats.map((s, i) => (
                                <div key={s.label} className="group">
                                    <p className="text-3xl sm:text-4xl font-black text-foreground tracking-tighter group-hover:text-primary transition-colors">{s.value}</p>
                                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-1">{s.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── COLONNE IMAGE ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden xl:block"
                    >
                        <div className="relative rounded-[3rem] overflow-hidden shadow-premium aspect-[4/5] animate-float">
                            <Image
                                src="/a.jpeg"
                                alt="Actions humanitaires de l'association Tammaha"
                                fill
                                priority
                                sizes="(max-width: 1280px) 100vw, 50vw"
                                className="object-cover object-center grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Citation */}
                            <div className="absolute bottom-0 left-0 right-0 px-10 py-10">
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="text-white text-2xl font-serif-display italic leading-tight"
                                >
                                    "Chaque geste compte pour construire un monde plus juste."
                                </motion.p>
                                <p className="text-white/60 text-xs font-black uppercase tracking-widest mt-4">— Equipe Tammaha</p>
                            </div>

                            {/* Badge flottant Glassmorphism */}
                            <div className="absolute top-8 right-8 glass dark:bg-white/10 rounded-[1.5rem] px-6 py-4 shadow-2xl flex items-center gap-3 border-2 border-white/40">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Impact Certifié</span>
                            </div>
                        </div>

                        {/* Cercles décoratifs */}
                        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/20 rounded-full blur-[80px] -z-10" />
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary/40 rounded-full blur-[80px] -z-10" />
                    </motion.div>

                </div>
            </Container>
        </section>
    );
}
