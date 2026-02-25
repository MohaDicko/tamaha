
"use client";

import { Container } from '@/components/layout/Container';
import { motion } from 'framer-motion';

const partners = [
    { name: 'Institution 1', logo: 'https://placehold.co/200x100/000000/FFFFFF/png?text=PARTENAIRE+1' },
    { name: 'Institution 2', logo: 'https://placehold.co/200x100/000000/FFFFFF/png?text=PARTENAIRE+2' },
    { name: 'Institution 3', logo: 'https://placehold.co/200x100/000000/FFFFFF/png?text=PARTENAIRE+3' },
    { name: 'Institution 4', logo: 'https://placehold.co/200x100/000000/FFFFFF/png?text=PARTENAIRE+4' },
    { name: 'Institution 5', logo: 'https://placehold.co/200x100/000000/FFFFFF/png?text=PARTENAIRE+5' },
    { name: 'Institution 6', logo: 'https://placehold.co/200x100/000000/FFFFFF/png?text=PARTENAIRE+6' },
];

export function PartnersGrid() {
    return (
        <section className="py-32 bg-[#050505] overflow-hidden border-t border-white/5">
            <Container>
                <div className="text-center mb-24 space-y-4">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[10px] font-black uppercase tracking-[0.5em] text-primary"
                    >
                        Réseau de Solidarité
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-white leading-none">
                        Ils Nous Font <span className="text-white/20">Confiance</span>
                    </h2>
                </div>

                <div className="relative group">
                    {/* Artistic Bloom effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-primary/5 blur-[100px] pointer-events-none rounded-full" />

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
                        {partners.map((partner, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="h-48 w-full relative flex items-center justify-center bg-[#050505] hover:bg-white/[0.02] transition-colors p-10 group/partner"
                            >
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="max-h-12 w-auto object-contain opacity-20 grayscale transition-all duration-700 group-hover/partner:opacity-100 group-hover/partner:grayscale-0 group-hover/partner:scale-110"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 text-center opacity-20 hover:opacity-100 transition-opacity duration-1000">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white">
                        +50 organisations locales et internationales collaborent avec Tamaha
                    </p>
                </div>
            </Container>
        </section>
    );
}
