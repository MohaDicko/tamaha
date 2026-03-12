
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, CreditCard, Landmark, ArrowRight, CheckCircle2, ShieldCheck, Zap, Globe, Shield, Lock, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// ✅ Montants en FCFA (monnaie locale des bénéficiaires)
const PRESETS = [
    { amount: 2500, label: "Un kit hygiène", icon: "🧼" },
    { amount: 5000, label: "Un kit scolaire", icon: "📚" },
    { amount: 10000, label: "Repas – 1 semaine", icon: "🍱" },
    { amount: 25000, label: "Soin médical", icon: "🏥" },
];

// Informations bancaires et mobiles officielles
const IBAN = "SN76 0001 2345 6789 0123 4567";
const SWIFT = "TAMM SN DA";
const MOBILE_NUMBER = "+223 85 05 02 02";
const BANK_NAME = "BNDE Sénégal / Mali";

export function DonationForm() {
    const [amount, setAmount] = useState<number | string>(5000);
    const [step, setStep] = useState(1);
    const [method, setMethod] = useState<'card' | 'transfer' | 'mobile' | null>(null);
    const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
    const [mobileProvider, setMobileProvider] = useState<'orange' | 'wave' | null>(null);
    const [loadingStripe, setLoadingStripe] = useState(false);
    const [ibanCopied, setIbanCopied] = useState(false);

    const copyIBAN = () => {
        navigator.clipboard.writeText(IBAN.replace(/\s/g, ''));
        setIbanCopied(true);
        setTimeout(() => setIbanCopied(false), 2500);
    };

    const handleAmountClick = (val: number) => {
        setAmount(val);
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-card border-2 border-border rounded-[3rem] shadow-premium overflow-hidden min-h-[650px] flex flex-col relative text-card-foreground">

                {/* Security Badge Floating */}
                <div className="absolute top-6 right-8 z-20 hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-[0.2em] border border-primary/20 backdrop-blur-md">
                    <Lock size={12} className="text-primary" /> Sécurisé par Stripe
                </div>

                {/* Stepper Header */}
                <div className="px-10 pt-12 pb-8 flex justify-between border-b border-border bg-muted/30">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center gap-4">
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: step === s ? 1.15 : 1,
                                    backgroundColor: step >= s ? "hsl(var(--primary))" : "hsl(var(--muted))",
                                    borderColor: step >= s ? "hsl(var(--primary))" : "hsl(var(--border))"
                                }}
                                className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm transition-all duration-500 border-2",
                                    step >= s ? "text-white" : "text-muted-foreground/30"
                                )}
                            >
                                {step > s ? <CheckCircle2 size={24} /> : s}
                            </motion.div>
                            <span className={cn(
                                "text-[10px] font-black uppercase tracking-[0.3em] hidden sm:inline-block",
                                step >= s ? "text-foreground" : "text-muted-foreground/30"
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
                                    <h2 className="text-4xl font-black tracking-tighter italic uppercase text-foreground">Changez des <span className="text-primary">vies.</span></h2>
                                    <p className="text-muted-foreground font-medium text-lg">Sélectionnez l'impact que vous souhaitez générer aujourd'hui.</p>
                                </div>

                                {/* Frequency Toggle */}
                                <div className="flex p-2 bg-muted border border-border rounded-[1.5rem] w-full max-w-sm mx-auto md:mx-0">
                                    <button
                                        onClick={() => setFrequency('once')}
                                        className={cn(
                                            "flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                                            frequency === 'once' ? "bg-background text-foreground shadow-2xl" : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        Don Unique
                                    </button>
                                    <button
                                        onClick={() => setFrequency('monthly')}
                                        className={cn(
                                            "flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2",
                                            frequency === 'monthly' ? "bg-background text-foreground shadow-2xl" : "text-muted-foreground hover:text-foreground"
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
                                                    ? "border-primary bg-primary/10 shadow-soft"
                                                    : "border-border bg-card hover:border-primary/50"
                                            )}
                                        >
                                            <span className="text-4xl block group-hover:scale-125 transition-transform duration-700">{p.icon}</span>
                                            <div className="text-center">
                                                <span className="text-2xl font-black block tracking-tighter text-foreground">{p.amount.toLocaleString('fr-FR')} FCFA</span>
                                                <span className="text-[8px] uppercase font-black text-muted-foreground leading-tight block mt-2 tracking-widest">{p.label}</span>
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
                                        <div className="absolute left-8 top-1/2 -translate-y-1/2 font-black text-2xl text-muted-foreground/30 group-focus-within:text-primary transition-colors">FCFA</div>
                                        <Input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="Montant personnalisé"
                                            className="h-24 pl-24 text-3xl font-black bg-muted border-2 border-border focus:border-primary/50 rounded-[2rem] transition-all text-foreground placeholder:text-muted-foreground/20"
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
                                    <h2 className="text-4xl font-black tracking-tighter italic uppercase text-foreground">Mode de <span className="text-primary">Soutien</span></h2>
                                    <p className="text-muted-foreground font-medium text-lg">Choisissez votre canal de solidarité.</p>
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
                                                    ? "border-primary bg-primary/5 shadow-soft"
                                                    : "border-border bg-card hover:border-primary/30"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-16 h-16 rounded-[1.25rem] flex items-center justify-center transition-all duration-500",
                                                method === m.id ? "bg-primary text-white scale-110" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                                            )}>
                                                <m.icon size={28} />
                                            </div>
                                            <div className="text-center">
                                                <span className="font-black text-lg block uppercase tracking-tight text-foreground">{m.name}</span>
                                                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 mt-2 block">{m.sub}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6 pt-6">
                                    <Button variant="ghost" className="h-20 px-10 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] text-muted-foreground hover:text-foreground" onClick={prevStep}>
                                        Retour
                                    </Button>
                                    <Button className="flex-1 h-20 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-soft bg-primary text-white hover:bg-primary/90 transition-all" onClick={nextStep} disabled={!method}>
                                        Confirmer — {Number(amount).toLocaleString('fr-FR')} FCFA
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
                                            <h2 className="text-5xl font-black tracking-tighter uppercase italic text-foreground">Redirection...</h2>
                                            <p className="text-muted-foreground font-medium max-w-sm mx-auto leading-relaxed text-lg">
                                                Transaction sécurisée via <strong className="text-foreground">Stripe™</strong>. Patientez quelques instants.
                                            </p>
                                        </div>
                                        <Button
                                            size="lg"
                                            className="w-full h-20 bg-[#635BFF] hover:bg-[#534bdf] font-black uppercase tracking-[0.2em] text-[11px] rounded-[1.5rem] shadow-2xl shadow-blue-500/20 transition-all flex items-center justify-center gap-4"
                                            disabled={loadingStripe}
                                            onClick={async () => {
                                                try {
                                                    setLoadingStripe(true);

                                                    // simulation pour le développement si Stripe n'est pas configuré
                                                    const isStripeConfigured = false; // Sera vérifié par l'API

                                                    // 1. Enregistrer l'intention de don en PENDING
                                                    const donateRes = await fetch('/api/donate', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({ amount: Number(amount), method: 'card', frequency })
                                                    });
                                                    const donateData = await donateRes.json();

                                                    // 2. Créer la session Stripe
                                                    const amountEUR = Math.max(1, Math.round(Number(amount) / 655));
                                                    const successUrlBase = `${window.location.origin}/donate/success?ref=${donateData.reference}&amount=${amount}&method=card`;

                                                    const res = await fetch('/api/stripe/checkout', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({
                                                            amount: amountEUR,
                                                            frequency,
                                                            return_url: successUrlBase,
                                                            donationId: donateData.id
                                                        })
                                                    });

                                                    const data = await res.json();

                                                    if (data.url) {
                                                        window.location.href = data.url;
                                                    } else {
                                                        // Fallback Mode Démo si erreur de clé (pour le test utilisateur)
                                                        if (process.env.NODE_ENV === 'development') {
                                                            toast.info("Mode Simulation : Redirection vers succès...");
                                                            setTimeout(() => {
                                                                window.location.href = successUrlBase;
                                                            }, 2000);
                                                        } else {
                                                            throw new Error(data.error || "Erreur Stripe");
                                                        }
                                                    }
                                                } catch (err) {
                                                    console.error(err);
                                                    toast.error("Le service de paiement est temporairement indisponible.");
                                                    setLoadingStripe(false);
                                                }
                                            }}
                                        >
                                            {loadingStripe ? <Loader2 size={24} className="animate-spin" /> : "Finaliser sur Stripe"} <ArrowRight size={20} />
                                        </Button>
                                    </div>
                                ) : method === 'mobile' ? (
                                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
                                        <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-muted rounded-[2.5rem] border border-border">
                                            <div className="w-24 h-24 bg-orange-500/10 rounded-3xl flex items-center justify-center shrink-0 border border-orange-500/20">
                                                <Zap size={44} className="text-orange-500 animate-pulse" />
                                            </div>
                                            <div className="text-center md:text-left space-y-2">
                                                <h2 className="text-3xl font-black tracking-tighter uppercase italic text-foreground">Mobile Money</h2>
                                                <p className="text-muted-foreground text-lg font-medium leading-tight">Optimisé pour l'Afrique de l'Ouest (Sénégal & Mali).</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <button
                                                onClick={() => setMobileProvider('orange')}
                                                className={cn(
                                                    "p-8 rounded-[2rem] border-2 transition-all duration-500 text-center space-y-4 group relative overflow-hidden",
                                                    mobileProvider === 'orange' ? "border-[#FF6600] bg-[#FF6600]/10 shadow-[0_10px_30px_rgba(255,102,0,0.2)]" : "border-border bg-card hover:border-[#FF6600]/40"
                                                )}
                                            >
                                                <div className="w-16 h-16 bg-[#FF6600] rounded-2xl flex items-center justify-center mx-auto text-white font-black text-2xl shadow-xl group-hover:rotate-6 transition-transform relative z-10">
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Orange_logo.svg" alt="Orange" className="w-10 h-10 invert p-1" />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] block relative z-10 text-foreground">Orange Money</span>
                                            </button>
                                            <button
                                                onClick={() => setMobileProvider('wave')}
                                                className={cn(
                                                    "p-8 rounded-[2rem] border-2 transition-all duration-500 text-center space-y-4 group relative overflow-hidden",
                                                    mobileProvider === 'wave' ? "border-[#1DC3ED] bg-[#1DC3ED]/10 shadow-[0_10px_30px_rgba(29,195,237,0.2)]" : "border-border bg-card hover:border-[#1DC3ED]/40"
                                                )}
                                            >
                                                <div className="w-16 h-16 bg-[#1DC3ED] rounded-2xl flex items-center justify-center mx-auto text-white font-black text-2xl shadow-xl group-hover:rotate-6 transition-transform relative z-10 text-[32px]">W</div>
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] block relative z-10 text-foreground">Wave</span>
                                            </button>
                                        </div>

                                        {mobileProvider && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-10 bg-muted rounded-[3rem] border border-border space-y-8 relative overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl pointer-events-none" />
                                                <div className="flex items-center gap-4">
                                                    <div className={cn(
                                                        "w-4 h-4 rounded-full animate-pulse",
                                                        mobileProvider === 'orange' ? "bg-orange-500 shadow-[0_0_15px_rgba(255,102,0,0.5)]" : "bg-[#1DC3ED] shadow-[0_0_15px_rgba(29,195,237,0.5)]"
                                                    )} />
                                                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Instructions d'Impact</span>
                                                </div>
                                                <div className="space-y-4">
                                                    <p className="text-xl font-bold leading-relaxed text-muted-foreground">
                                                        Transférez <span className="text-foreground font-black underline decoration-primary underline-offset-8">{Number(amount).toLocaleString('fr-FR')} FCFA</span> au numéro officiel TAMMAHA :
                                                    </p>
                                                    <div className="bg-background p-6 rounded-2xl border border-border text-center relative group">
                                                        <strong className="text-4xl font-black tracking-[0.15em] block text-primary">{MOBILE_NUMBER}</strong>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="absolute top-2 right-2 h-8 px-3 rounded-lg text-[9px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity bg-muted border border-border"
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(MOBILE_NUMBER.replace(/\s/g, ''));
                                                                toast.success("Numéro copié !");
                                                            }}
                                                        >
                                                            Copier
                                                        </Button>
                                                    </div>
                                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/30 pt-4">
                                                        <span>Compte : Assoc TAMMAHA</span>
                                                        <span>Mali / Sénégal</span>
                                                    </div>
                                                </div>
                                                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20 space-y-4">
                                                    <p className="text-[11px] font-medium leading-relaxed italic text-primary/80">
                                                        Une fois l'envoi terminé, cliquez sur le bouton ci-dessous pour envoyer votre référence par WhatsApp.
                                                    </p>
                                                    <Button
                                                        onClick={async () => {
                                                            try {
                                                                // ✅ Enregistrement en DB + récupération de la référence
                                                                const res = await fetch('/api/donate', {
                                                                    method: 'POST',
                                                                    headers: { 'Content-Type': 'application/json' },
                                                                    body: JSON.stringify({ amount: Number(amount), method: 'mobile', provider: mobileProvider, frequency })
                                                                });
                                                                const data = await res.json();
                                                                const ref = data.reference || '';

                                                                const text = encodeURIComponent(
                                                                    `Bonjour Tammaha ! Don de ${Number(amount).toLocaleString('fr-FR')} FCFA via ${mobileProvider === 'orange' ? 'Orange Money' : 'Wave'
                                                                    }. Référence : ${ref}. Merci !`
                                                                );
                                                                window.open(`https://wa.me/22385050202?text=${text}`, '_blank');

                                                                // ✅ Redirection vers la page de succès
                                                                if (data.successUrl) {
                                                                    setTimeout(() => { window.location.href = data.successUrl; }, 1500);
                                                                }
                                                            } catch (err) {
                                                                console.error('Donation tracking error', err);
                                                                toast.error('Erreur lors de l\'enregistrement du don.');
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
                                        <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-muted rounded-[2.5rem] border border-border">
                                            <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center shrink-0 border border-primary/20">
                                                <Landmark size={44} className="text-primary" />
                                            </div>
                                            <div className="text-center md:text-left space-y-2">
                                                <h2 className="text-3xl font-black tracking-tighter uppercase italic text-foreground">Virement Bancaire</h2>
                                                <p className="text-muted-foreground text-lg font-medium leading-tight">Pour les dons institutionnels ou de montants importants.</p>
                                            </div>
                                        </div>

                                        <div className="p-10 bg-muted border border-border rounded-[3rem] space-y-10 relative overflow-hidden group shadow-soft">
                                            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-3xl pointer-events-none" />
                                            <div className="grid grid-cols-1 gap-10 text-sm">
                                                <div className="space-y-8">
                                                    <div className="space-y-4">
                                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Bénéficiaire Officiel</span>
                                                        <div className="p-6 bg-background rounded-2xl border border-border">
                                                            <p className="font-black text-xl uppercase tracking-tight text-foreground">{BANK_NAME}</p>
                                                            <p className="font-medium text-sm text-muted-foreground">Association TAMMAHA SOLIDARITÉ</p>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">IBAN</span>
                                                            <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border gap-4">
                                                                <p className="font-black text-sm tracking-[0.1em] text-primary truncate">{IBAN}</p>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="shrink-0 h-8 px-3 rounded-lg text-[9px] font-black bg-muted border border-border"
                                                                    onClick={copyIBAN}
                                                                >
                                                                    {ibanCopied ? 'OK' : 'Copier'}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Code SWIFT/BIC</span>
                                                            <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border gap-4">
                                                                <p className="font-black text-sm tracking-[0.1em] text-primary">{SWIFT}</p>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="shrink-0 h-8 px-3 rounded-lg text-[9px] font-black bg-muted border border-border"
                                                                    onClick={() => {
                                                                        navigator.clipboard.writeText(SWIFT);
                                                                        toast.success("SWIFT copié !");
                                                                    }}
                                                                >
                                                                    Copier
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-8 border-t border-white/10">
                                                {/* ✅ Virement : enregistrement en DB + redirection /donate/success */}
                                                <Button
                                                    className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all"
                                                    onClick={async () => {
                                                        try {
                                                            const res = await fetch('/api/donate', {
                                                                method: 'POST',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify({ amount: Number(amount), method: 'transfer', frequency })
                                                            });
                                                            const data = await res.json();
                                                            if (data.successUrl) {
                                                                window.location.href = data.successUrl;
                                                            }
                                                        } catch (err) {
                                                            toast.error('Erreur lors de l\'enregistrement.');
                                                        }
                                                    }}
                                                >
                                                    Confirmer l'intention de virement
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Security Badge */}
                <div className="px-12 py-8 bg-muted/30 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6 pointer-events-none">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-background border border-border rounded-xl flex items-center justify-center text-primary">
                            <ShieldCheck size={20} />
                        </div>
                        <div className="leading-tight">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground block">
                                Infrastructure Sécurisée
                            </span>
                            <span className="text-[8px] font-black uppercase tracking-[0.1em] text-muted-foreground/40">
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
            <div className="mt-8 text-center flex items-center justify-center gap-3 opacity-40">
                <Shield size={14} className="text-primary" />
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground">
                    Tammaha est une association reconnue d'intérêt général • Reçu fiscal émis automatiquement
                </p>
            </div>
        </div >
    );
}
