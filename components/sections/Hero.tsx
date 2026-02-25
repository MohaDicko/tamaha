"use client";

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/Container';
import { ArrowRight, Globe, Users, Sparkles, Zap, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-[90vh] flex items-center pt-20 pb-20 overflow-hidden bg-slate-50">
            {/* Professional Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full opacity-50" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-secondary/10 blur-[100px] rounded-full opacity-30" />
            </div>

            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                    {/* Content Section */}
                    <div className="lg:col-span-12 xl:col-span-7 space-y-10">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold uppercase tracking-widest text-primary"
                            >
                                <Sparkles size={14} className="text-primary" />
                                Association Tamaha • Solidarité & Espoir
                            </motion.div>

                            <div className="space-y-4">
                                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] text-slate-900 uppercase">
                                    Bâtir un <span className="text-primary italic">Avenir</span> <br />
                                    Durable et Solidaire
                                </h1>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="max-w-2xl text-lg md:text-xl text-slate-600 font-medium leading-relaxed"
                                >
                                    Tamaha s'engage pour l'autonomie des communautés au Sénégal et au Mali à travers des actions concrètes en santé, éducation et protection sociale.
                                </motion.p>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row items-center gap-6"
                        >
                            <Button size="lg" className="h-16 px-10 text-xs font-bold uppercase tracking-widest rounded-full bg-primary text-white hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 group" asChild>
                                <Link href="/donate">
                                    Faire un Don
                                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>

                            <Button variant="outline" className="h-16 px-10 text-xs font-bold uppercase tracking-widest rounded-full border-slate-200 text-slate-600 hover:bg-slate-50" asChild>
                                <Link href="/actions">
                                    Nos Projets
                                </Link>
                            </Button>
                        </motion.div>

                        <div className="pt-8 flex items-center gap-10 border-t border-slate-200 w-fit">
                            <div className="flex flex-col">
                                <span className="text-3xl font-black text-slate-900 tracking-tighter">1500+</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Bénéficiaires</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-black text-slate-900 tracking-tighter">08</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Projets Actifs</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-black text-slate-900 tracking-tighter">100%</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Transparence</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Professional Visual */}
                    <div className="lg:col-span-12 xl:col-span-5 relative hidden xl:block">
                        <div className="relative z-10 w-full aspect-square bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100 overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                            <div className="relative h-full w-full rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
                                <img
                                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
                                    alt="Humanitarian Action"
                                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <p className="text-white text-sm font-bold italic leading-relaxed">
                                        "L'éducation est l'arme la plus puissante pour changer le monde."
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Decorative blobs */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                    </div>

                </div>
            </Container>
        </section>
    );
}
