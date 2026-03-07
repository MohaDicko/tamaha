'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Container } from '@/components/layout/Container';
import { CheckCircle2, Heart, ArrowRight, Home, ReceiptText } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function DonateSuccessContent() {
    const params = useSearchParams();
    const reference = params.get('ref');
    const amount = params.get('amount');
    const method = params.get('method');

    return (
        <div className="min-h-screen bg-background flex items-center justify-center py-20 px-4">
            <Container className="max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="bg-card border-2 border-green-500/20 rounded-[3rem] p-10 md:p-16 text-center space-y-8 shadow-2xl shadow-green-500/5"
                >
                    {/* Icône animée */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="mx-auto w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center"
                    >
                        <CheckCircle2 size={48} className="text-green-500" />
                    </motion.div>

                    {/* Titre */}
                    <div className="space-y-3">
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl md:text-4xl font-black tracking-tighter"
                        >
                            Merci pour votre{' '}
                            <span className="text-primary italic">générosité !</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-muted-foreground font-medium leading-relaxed"
                        >
                            Votre promesse de don a bien été enregistrée. L'équipe Tammaha vous remercie
                            sincèrement — votre soutien change des vies concrètement sur le terrain.
                        </motion.p>
                    </div>

                    {/* Récapitulatif */}
                    {(reference || amount) && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-muted/50 rounded-2xl p-6 space-y-3 text-left"
                        >
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">
                                <ReceiptText size={13} /> Récapitulatif de votre don
                            </div>
                            {reference && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground font-medium">Référence</span>
                                    <span className="font-black text-primary">{reference}</span>
                                </div>
                            )}
                            {amount && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground font-medium">Montant</span>
                                    <span className="font-black">{parseInt(amount).toLocaleString('fr-FR')} FCFA</span>
                                </div>
                            )}
                            {method && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground font-medium">Méthode</span>
                                    <span className="font-black capitalize">{method}</span>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Message d'encouragement */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-medium"
                    >
                        <Heart size={14} className="text-red-400 fill-red-400" />
                        <span>Votre don permettra d'aider des femmes, des jeunes et des familles vulnérables.</span>
                    </motion.div>

                    {/* CTA boutons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                        >
                            <Home size={15} /> Retour à l'accueil
                        </Link>
                        <Link
                            href="/actions"
                            className="flex items-center justify-center gap-2 px-8 py-4 bg-muted text-foreground font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-muted/70 transition-colors"
                        >
                            Voir nos actions <ArrowRight size={15} />
                        </Link>
                    </motion.div>
                </motion.div>
            </Container>
        </div>
    );
}

export default function DonateSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <DonateSuccessContent />
        </Suspense>
    );
}
