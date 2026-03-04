"use client";

import Link from 'next/link';
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
        <section className="relative flex items-center min-h-[100svh] pt-20 sm:pt-24 pb-12 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary/5">

            {/* ── Fond décoratif ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 -left-24 w-[380px] h-[380px] bg-secondary/20 rounded-full blur-[90px]" />
            </div>

            <Container className="relative z-10 w-full">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-16 items-center">

                    {/* ── COLONNE TEXTE ── */}
                    <div className="flex flex-col gap-7">

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45 }}
                        >
                            <span className="section-label">
                                <Sparkles size={13} />
                                Association Tamaha &middot; Solidarité &amp; Espoir
                            </span>
                        </motion.div>

                        {/* Titre */}
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="space-y-4"
                        >
                            <h1 className="text-slate-900">
                                Bâtir un{' '}
                                <span className="text-primary italic font-serif-display">Avenir</span>
                                <br />
                                Durable &amp; Solidaire
                            </h1>
                            <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-lg">
                                Tamaha s'engage pour l'autonomie des communautés au Sénégal et au Mali
                                à travers des actions concrètes en santé, éducation et protection sociale.
                            </p>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.22 }}
                            className="flex flex-col sm:flex-row gap-3"
                        >
                            <Button
                                size="lg"
                                asChild
                                className="h-13 px-8 rounded-full font-semibold text-[15px] bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25 group transition-all"
                            >
                                <Link href="/donate">
                                    Faire un Don
                                    <ArrowRight size={17} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                asChild
                                className="h-13 px-8 rounded-full font-medium text-[15px] border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
                            >
                                <Link href="/actions">Nos Projets</Link>
                            </Button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.38 }}
                            className="flex items-start gap-8 sm:gap-12 pt-4 border-t border-slate-200"
                        >
                            {stats.map((s) => (
                                <div key={s.label}>
                                    <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{s.value}</p>
                                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mt-0.5">{s.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── COLONNE IMAGE ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.65, delay: 0.15 }}
                        className="relative hidden xl:block"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 aspect-[4/5]">
                            <img
                                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop&crop=faces"
                                alt="Actions humanitaires de l'association Tamaha"
                                className="w-full h-full object-cover object-center"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                            {/* Citation */}
                            <div className="absolute bottom-0 left-0 right-0 px-7 py-6">
                                <p className="text-white text-[17px] font-serif-display italic leading-snug">
                                    "L'éducation est l'arme la plus puissante pour changer le monde."
                                </p>
                                <p className="text-white/55 text-xs font-medium mt-2 tracking-wide">— Nelson Mandela</p>
                            </div>

                            {/* Badge flottant */}
                            <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-lg flex items-center gap-2 border border-white/60">
                                <HeartHandshake size={16} className="text-primary" />
                                <span className="text-sm font-semibold text-slate-800">Association certifiée</span>
                            </div>
                        </div>

                        {/* Blobs décoratifs */}
                        <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-primary/12 rounded-full blur-3xl" />
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary/30 rounded-full blur-2xl" />
                    </motion.div>

                </div>
            </Container>
        </section>
    );
}
