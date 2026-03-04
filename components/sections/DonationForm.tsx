
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, CreditCard, Landmark, ArrowRight, CheckCircle2, ShieldCheck, Zap, Globe, Shield, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

const PRESETS = [
    { amount: 10, label: "Un kit hygiène", icon: "🧼" },
    { amount: 30, label: "Un kit scolaire", icon: "📚" },
    { amount: 50, label: "Repas - 1 semaine", icon: "🍱" },
    { amount: 100, label: "Soin médical", icon: "🏥" },
];

export function DonationForm() {
    const [amount, setAmount] = useState<number | string>(30);
    const [step, setStep] = useState(1);
    const [method, setMethod] = useState<'card' | 'transfer' | 'mobile' | null>(null);
    const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
    const [mobileProvider, setMobileProvider] = useState<'orange' | 'wave' | null>(null);

    const handleAmountClick = (val: number) => {
        setAmount(val);
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-[#111111] border border-white/10 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden min-h-[650px] flex flex-col relative text-white">

                {/* Security Badge Floating */}
                <div className="absolute top-6 right-8 z-20 hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-[0.2em] border border-primary/20 backdrop-blur-md">
                    <Lock size={12} className="text-primary" /> Sécurisé par Stripe
                </div>

                {/* Stepper Header */}
                <div className="px-10 pt-12 pb-8 flex justify-between border-b border-white/5 bg-white/[0.02]">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center gap-4">
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: step === s ? 1.15 : 1,
                                    backgroundColor: step >= s ? "var(--primary)" : "rgba(255,255,255,0.05)",
                                    borderColor: step >= s ? "var(--primary)" : "rgba(255,255,255,0.1)"
                                }}
                                className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-2xl transition-all duration-500 border-2",
                                    step >= s ? "text-white" : "text-white/20"
                                )}
                            >
                                {step > s ? <CheckCircle2 size={24} /> : s}
                            </motion.div>
                            <span className={cn(
                                "text-[10px] font-black uppercase tracking-[0.3em] hidden sm:inline-block",
                                step >= s ? "text-white" : "text-white/20"
                            )}>
                                {s === 1 ? "Impact" : s === 2 ? "Méthode" : "Validation"}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="p-10 md:p-14 flex-1 flex flex-col justify-start relative">
                    {/* Interior Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[100px] pointer-events-none" />

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="space-y-12 relative z-10"
                            >
                                <div className="space-y-4 text-center md:text-left">
                                    <h2 className="text-4xl font-black tracking-tighter italic uppercase">Changez des <span className="text-primary">vies.</span></h2>
                                    <p className="text-white/40 font-medium text-lg">Sélectionnez l'impact que vous souhaitez générer aujourd'hui.</p>
                                </div>

                                {/* Frequency Toggle */}
                                <div className="flex p-2 bg-white/5 border border-white/10 rounded-[1.5rem] w-full max-w-sm mx-auto md:mx-0">
                                    <button
                                        onClick={() => setFrequency('once')}
                                        className={cn(
                                            "flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                                            frequency === 'once' ? "bg-white text-black shadow-2xl" : "text-white/40 hover:text-white"
                                        )}
                                    >
                                        Don Unique
                                    </button>
                                    <button
                                        onClick={() => setFrequency('monthly')}
                                        className={cn(
                                            "flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2",
                                            frequency === 'monthly' ? "bg-white text-black shadow-2xl" : "text-white/40 hover:text-white"
                                        )}
                                    >
                                        <Zap size={14} className={frequency === 'monthly' ? "fill-primary text-primary" : ""} />
                                        Mensuel
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                    {PRESETS.map((p) => (
                                        <button
                                            key={p.amount}
                                            onClick={() => handleAmountClick(p.amount)}
                                            className={cn(
                                                "p-6 sm:p-8 rounded-[2rem] border-2 transition-all duration-500 flex flex-col items-center gap-6 group relative overflow-hidden",
                                                amount === p.amount
                                                    ? "border-primary bg-primary/10 shadow-[0_20px_40px_rgba(var(--primary-rgb),0.2)]"
                                                    : "border-white/5 bg-white/5 hover:border-white/20"
                                            )}
                                        >
                                            <span className="text-4xl block group-hover:scale-125 transition-transform duration-700">{p.icon}</span>
                                            <div className="text-center">
                                                <span className="text-2xl font-black block tracking-tighter">{p.amount}€</span>
                                                <span className="text-[8px] uppercase font-black text-white/30 leading-tight block mt-2 tracking-widest">{p.label}</span>
                                            </div>
                                            {amount === p.amount && (
                                                <motion.div layoutId="active" className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 bg-primary rounded-full text-white shadow-lg">
                                                    <CheckCircle2 size={14} strokeWidth={3} />
                                                </motion.div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-8">
                                    <div className="relative group">
                                        <div className="absolute left-8 top-1/2 -translate-y-1/2 font-black text-3xl text-white/20 group-focus-within:text-primary transition-colors">€</div>
                                        <Input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="Montant Personnalisé"
                                            className="h-24 pl-16 text-3xl font-black bg-white/5 border-2 border-white/5 focus:border-primary/50 rounded-[2rem] transition-all text-white placeholder:text-white/10"
                                        />
                                    </div>

                                    <Button size="lg" className="w-full h-20 text-[11px] font-black uppercase tracking-[0.3em] rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all" onClick={nextStep} disabled={!amount}>
                                        Continuer Vers le Paiement <ArrowRight className="ml-4" size={20} />
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-12 relative z-10"
                            >
                                <div className="space-y-4 text-center md:text-left">
                                    <h2 className="text-4xl font-black tracking-tighter italic uppercase">Mode de <span className="text-primary">Soutien</span></h2>
                                    <p className="text-white/40 font-medium text-lg">Choisissez votre canal de solidarité.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {[
                                        { id: 'card', name: 'Carte Bancaire', sub: 'Sécurisé Stripe', icon: CreditCard },
                                        { id: 'mobile', name: 'Mobile Money', sub: 'Orange / Wave', icon: Zap },
                                        { id: 'transfer', name: 'Virement IBAN', sub: 'Zone SEPA / Mali', icon: Landmark }
                                    ].map((m) => (
                                        <button
                                            key={m.id}
                                            onClick={() => setMethod(m.id as any)}
                                            className={cn(
                                                "group p-8 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col items-center gap-6 relative overflow-hidden",
                                                method === m.id
                                                    ? "border-primary bg-primary/10 shadow-2xl"
                                                    : "border-white/5 bg-white/5 hover:border-white/20"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-16 h-16 rounded-[1.25rem] flex items-center justify-center transition-all duration-500",
                                                method === m.id ? "bg-primary text-white scale-110" : "bg-white/5 text-white/40 group-hover:bg-primary/20 group-hover:text-primary"
                                            )}>
                                                <m.icon size={28} />
                                            </div>
                                            <div className="text-center">
                                                <span className="font-black text-lg block uppercase tracking-tight">{m.name}</span>
                                                <span className="text-[9px] font-black uppercase tracking-widest text-white/20 mt-2 block">{m.sub}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6 pt-6">
                                    <Button variant="ghost" className="h-20 px-10 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] text-white/40 hover:text-white" onClick={prevStep}>
                                        Retour
                                    </Button>
                                    <Button className="flex-1 h-20 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-primary/20 bg-white text-black hover:bg-primary hover:text-white transition-all" onClick={nextStep} disabled={!method}>
                                        Confirmer le Don de {amount}€
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-12 relative z-10"
                            >
                                {method === 'card' ? (
                                    <div className="py-10 space-y-10 text-center">
                                        <div className="w-32 h-32 bg-primary/10 rounded-[3.5rem] flex items-center justify-center mx-auto relative group">
                                            <CreditCard size={56} className="text-primary relative z-10" />
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 border-2 border-dashed border-primary/40 rounded-[3.5rem]"
                                            />
                                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-50 group-hover:scale-100 transition-transform duration-1000" />
                                        </div>
                                        <div className="space-y-6">
                                            <h2 className="text-5xl font-black tracking-tighter uppercase italic">Redirection...</h2>
                                            <p className="text-white/40 font-medium max-w-sm mx-auto leading-relaxed text-lg">
                                                Transaction sécurisée via <strong className="text-white">Stripe™</strong>. Patientez quelques instants.
                                            </p>
                                        </div>
                                        <Button size="lg" className="w-full h-20 bg-[#635BFF] hover:bg-[#534bdf] font-black uppercase tracking-[0.2em] text-[11px] rounded-[1.5rem] shadow-2xl shadow-blue-500/20 transition-all flex items-center justify-center gap-4">
                                            Finaliser sur Stripe <ArrowRight size={20} />
                                        </Button>
                                    </div>
                                ) : method === 'mobile' ? (
                                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
                                        <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-white/5 rounded-[2.5rem] border border-white/10">
                                            <div className="w-24 h-24 bg-orange-500/10 rounded-3xl flex items-center justify-center shrink-0 border border-orange-500/20">
                                                <Zap size={44} className="text-orange-500 animate-pulse" />
                                            </div>
                                            <div className="text-center md:text-left space-y-2">
                                                <h2 className="text-3xl font-black tracking-tighter uppercase italic">Mobile Money</h2>
                                                <p className="text-white/40 text-lg font-medium leading-tight">Optimisé pour l'Afrique de l'Ouest (Sénégal & Mali).</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <button
                                                onClick={() => setMobileProvider('orange')}
                                                className={cn(
                                                    "p-8 rounded-[2rem] border-2 transition-all duration-500 text-center space-y-4 group",
                                                    mobileProvider === 'orange' ? "border-[#FF6600] bg-[#FF6600]/10 shadow-[0_10px_30px_rgba(255,102,0,0.2)]" : "border-white/5 bg-white/5 hover:border-[#FF6600]/40"
                                                )}
                                            >
                                                <div className="w-16 h-16 bg-[#FF6600] rounded-2xl flex items-center justify-center mx-auto text-white font-black text-2xl shadow-xl group-hover:rotate-6 transition-transform">O</div>
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] block">Orange Money</span>
                                            </button>
                                            <button
                                                onClick={() => setMobileProvider('wave')}
                                                className={cn(
                                                    "p-8 rounded-[2rem] border-2 transition-all duration-500 text-center space-y-4 group",
                                                    mobileProvider === 'wave' ? "border-[#1DC3ED] bg-[#1DC3ED]/10 shadow-[0_10px_30px_rgba(29,195,237,0.2)]" : "border-white/5 bg-white/5 hover:border-[#1DC3ED]/40"
                                                )}
                                            >
                                                <div className="w-16 h-16 bg-[#1DC3ED] rounded-2xl flex items-center justify-center mx-auto text-white font-black text-2xl shadow-xl group-hover:rotate-6 transition-transform">W</div>
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] block">Wave</span>
                                            </button>
                                        </div>

                                        {mobileProvider && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-10 bg-white/5 rounded-[3rem] border border-white/10 space-y-8 relative overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl pointer-events-none" />
                                                <div className="flex items-center gap-4">
                                                    <div className={cn(
                                                        "w-4 h-4 rounded-full animate-pulse",
                                                        mobileProvider === 'orange' ? "bg-orange-500 shadow-[0_0_15px_rgba(255,102,0,0.5)]" : "bg-[#1DC3ED] shadow-[0_0_15px_rgba(29,195,237,0.5)]"
                                                    )} />
                                                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">Instructions d'Impact</span>
                                                </div>
                                                <div className="space-y-4">
                                                    <p className="text-xl font-bold leading-relaxed text-white/80">
                                                        Transférez <span className="text-white font-black underline decoration-primary underline-offset-8">{amount}€</span> au numéro officiel TAMAHA:
                                                    </p>
                                                    <div className="bg-white/10 p-6 rounded-2xl border border-white/10 text-center">
                                                        <strong className="text-4xl font-black tracking-[0.15em] block text-primary">85 05 02 02</strong>
                                                    </div>
                                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/30 pt-4">
                                                        <span>Nom du Compte: Assoc TAMAHA</span>
                                                        <span>Pays: Mali / Sénégal</span>
                                                    </div>
                                                </div>
                                                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20 space-y-4">
                                                    <p className="text-[11px] font-medium leading-relaxed italic text-primary/80">
                                                        Une fois l'envoi terminé, envoyez-nous la référence par WhatsApp. Nos équipes valideront l'impact immédiatement.
                                                    </p>
                                                    <Button
                                                        onClick={async () => {
                                                            try {
                                                                const res = await fetch('/api/donate', {
                                                                    method: 'POST',
                                                                    headers: { 'Content-Type': 'application/json' },
                                                                    body: JSON.stringify({ amount: Number(amount), method: 'mobile', provider: mobileProvider, frequency })
                                                                });
                                                                let ref = '';
                                                                if (res.ok) {
                                                                    const data = await res.json();
                                                                    ref = data.reference;
                                                                }

                                                                const text = encodeURIComponent(`Bonjour l'équipe Tamaha ! Je viens de faire un don de ${amount}€ via ${mobileProvider === 'orange' ? 'Orange Money' : 'Wave'}. Voici la référence de la transaction : `);
                                                                window.open(`https://wa.me/22385050202?text=${text}`, '_blank');
                                                            } catch (err) {
                                                                console.error("Donation tracking error", err);
                                                            }
                                                        }}
                                                        className="w-full h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
                                                    >
                                                        Confirmer sur WhatsApp
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}

                                        <Button variant="outline" className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-[9px] border-white/5 bg-white/5 text-white/40 hover:text-white" onClick={() => setStep(1)}>
                                            Annuler et Recommencer
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-10">
                                        <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-white/5 rounded-[2.5rem] border border-white/10">
                                            <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center shrink-0 border border-primary/20">
                                                <Landmark size={44} className="text-primary" />
                                            </div>
                                            <div className="text-center md:text-left space-y-2">
                                                <h2 className="text-3xl font-black tracking-tighter uppercase italic">Virement Bancaire</h2>
                                                <p className="text-white/40 text-lg font-medium leading-tight">Pour les dons institutionnels ou de montants importants.</p>
                                            </div>
                                        </div>

                                        <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] space-y-10 relative overflow-hidden group shadow-3xl">
                                            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-3xl pointer-events-none" />
                                            <div className="grid grid-cols-1 gap-10 text-sm">
                                                <div className="space-y-2">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Bénéficiaire Officiel</span>
                                                    <p className="font-black text-2xl uppercase tracking-tight text-white/90">Association TAMAHA SOLIDARITÉ</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Coordonnées IBAN (Sénégal)</span>
                                                    <div className="flex items-center justify-between p-6 bg-black/40 rounded-2xl border border-white/5">
                                                        <p className="font-black text-xl tracking-[0.1em] text-primary">SN76 1234 5678 9012 3456</p>
                                                        <Button variant="ghost" size="sm" className="h-10 px-5 rounded-xl text-[9px] font-black uppercase tracking-widest bg-white/10 border border-white/10 hover:bg-primary hover:text-white text-white/60">Copier</Button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-8 border-t border-white/10">
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-2">
                                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Référence Transaction</span>
                                                        <p className="font-black text-3xl italic tracking-tighter text-white">DON-TAMAHA-{Math.floor(Math.random() * 90000) + 10000}</p>
                                                    </div>
                                                    <Globe size={40} className="text-white/5 group-hover:text-primary/20 transition-colors duration-1000" />
                                                </div>
                                            </div>
                                        </div>

                                        <Button variant="outline" className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-[9px] border-white/5 bg-white/5 text-white/40 hover:text-white" onClick={() => setStep(1)}>
                                            Fermer la Fenêtre Securisée
                                        </Button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Security Badge */}
                <div className="px-12 py-8 bg-white/[0.02] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 pointer-events-none">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                            <ShieldCheck size={20} className="text-primary" />
                        </div>
                        <div className="leading-tight">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 block">
                                Infrastructure Sécurisée
                            </span>
                            <span className="text-[8px] font-black uppercase tracking-[0.1em] text-white/20">
                                Chiffrement Militaire AES-256
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 opacity-30 grayscale transition-all duration-1000 hover:opacity-100 hover:grayscale-0">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
                    </div>
                </div>
            </div>

            {/* Trust Notice */}
            <div className="mt-8 text-center flex items-center justify-center gap-3 opacity-30">
                <Shield size={14} className="text-primary" />
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white">
                    Tamaha est une association reconnue d'intérêt général • Reçu fiscal émis automatiquement
                </p>
            </div>
        </div>
    );
}
