
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, CreditCard, Landmark, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
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
    const [mobileProvider, setMobileProvider] = useState<'orange' | 'moov' | null>(null);

    const handleAmountClick = (val: number) => {
        setAmount(val);
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-card border rounded-[2rem] shadow-2xl overflow-hidden min-h-[600px] flex flex-col relative">
                {/* Security Badge Floating */}
                <div className="absolute top-4 right-8 z-20 hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                    <ShieldCheck size={12} /> SSL 256-bit
                </div>

                {/* Stepper Header */}
                <div className="px-8 pt-10 pb-6 flex justify-between border-b bg-muted/20">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center gap-3">
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: step === s ? 1.1 : 1,
                                    backgroundColor: step >= s ? "var(--primary)" : "var(--muted)"
                                }}
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shadow-sm transition-colors",
                                    step >= s ? "text-primary-foreground" : "text-muted-foreground"
                                )}
                            >
                                {step > s ? <CheckCircle2 size={20} /> : s}
                            </motion.div>
                            <span className={cn(
                                "text-[11px] font-black uppercase tracking-[0.2em] hidden sm:inline-block",
                                step >= s ? "text-foreground" : "text-muted-foreground"
                            )}>
                                {s === 1 ? "Impact" : s === 2 ? "Paiement" : "Finalisation"}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="p-8 md:p-12 flex-1 flex flex-col justify-start">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-10"
                            >
                                <div className="space-y-2 text-center md:text-left">
                                    <h2 className="text-3xl font-black tracking-tight">Votre impact compte</h2>
                                    <p className="text-muted-foreground font-medium">Choisissez comment vous souhaitez soutenir nos actions.</p>
                                </div>

                                {/* Frequency Toggle */}
                                <div className="flex p-1.5 bg-muted rounded-2xl w-full max-w-sm mx-auto md:mx-0">
                                    <button
                                        onClick={() => setFrequency('once')}
                                        className={cn(
                                            "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                                            frequency === 'once' ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        Une fois
                                    </button>
                                    <button
                                        onClick={() => setFrequency('monthly')}
                                        className={cn(
                                            "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                                            frequency === 'monthly' ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <Zap size={14} className={frequency === 'monthly' ? "fill-primary" : ""} />
                                        Mensuel
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {PRESETS.map((p) => (
                                        <button
                                            key={p.amount}
                                            onClick={() => handleAmountClick(p.amount)}
                                            className={cn(
                                                "p-4 sm:p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 group relative overflow-hidden",
                                                amount === p.amount
                                                    ? "border-primary bg-primary/5 shadow-xl shadow-primary/10"
                                                    : "border-border hover:border-primary/30"
                                            )}
                                        >
                                            <span className="text-3xl block group-hover:scale-125 transition-transform duration-500">{p.icon}</span>
                                            <div className="text-center">
                                                <span className="text-2xl font-black block">{p.amount}€</span>
                                                <span className="text-[10px] uppercase font-black text-muted-foreground/60 leading-tight block mt-1">{p.label}</span>
                                            </div>
                                            {amount === p.amount && (
                                                <motion.div layoutId="active" className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 bg-primary rounded-full text-white">
                                                    <CheckCircle2 size={12} strokeWidth={3} />
                                                </motion.div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-6">
                                    <div className="relative group">
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-2xl text-muted-foreground/50 group-focus-within:text-primary transition-colors">€</div>
                                        <Input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="Autre montant"
                                            className="h-20 pl-14 text-2xl font-black bg-muted/30 border-2 border-transparent focus:border-primary/30 rounded-[1.5rem] transition-all"
                                        />
                                    </div>

                                    <Button size="lg" className="w-full h-16 text-lg font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform" onClick={nextStep} disabled={!amount}>
                                        Étape Suivante <ArrowRight className="ml-3" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-10"
                            >
                                <div className="space-y-2 text-center md:text-left">
                                    <h2 className="text-3xl font-black tracking-tight">Mode de paiement</h2>
                                    <p className="text-muted-foreground font-medium">Sélectionnez la méthode qui vous convient le mieux.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <button
                                        onClick={() => setMethod('card')}
                                        className={cn(
                                            "group p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 relative overflow-hidden",
                                            method === 'card'
                                                ? "border-primary bg-primary/5 shadow-xl shadow-primary/10"
                                                : "border-border hover:border-primary/20"
                                        )}
                                    >
                                        <div className={cn(
                                            "p-3 rounded-2xl transition-colors",
                                            method === 'card' ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                                        )}>
                                            <CreditCard size={24} />
                                        </div>
                                        <div className="text-center">
                                            <span className="font-black text-base block italic">Carte Bancaire</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mt-1 block">Débit Immédiat</span>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setMethod('mobile')}
                                        className={cn(
                                            "group p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 relative overflow-hidden",
                                            method === 'mobile'
                                                ? "border-primary bg-primary/5 shadow-xl shadow-primary/10"
                                                : "border-border hover:border-primary/20"
                                        )}
                                    >
                                        <div className={cn(
                                            "p-3 rounded-2xl transition-colors",
                                            method === 'mobile' ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                                        )}>
                                            <Zap size={24} />
                                        </div>
                                        <div className="text-center">
                                            <span className="font-black text-base block italic">Mobile Money</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mt-1 block">Orange / Moov</span>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setMethod('transfer')}
                                        className={cn(
                                            "group p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 relative overflow-hidden sm:col-span-2 lg:col-span-1",
                                            method === 'transfer'
                                                ? "border-primary bg-primary/5 shadow-xl shadow-primary/10"
                                                : "border-border hover:border-primary/20"
                                        )}
                                    >
                                        <div className={cn(
                                            "p-3 rounded-2xl transition-colors",
                                            method === 'transfer' ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                                        )}>
                                            <Landmark size={24} />
                                        </div>
                                        <div className="text-center">
                                            <span className="font-black text-base block italic">Virement (IBAN)</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mt-1 block">Europe / Afrique</span>
                                        </div>
                                    </button>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Button variant="ghost" className="h-14 rounded-2xl font-black uppercase tracking-widest text-xs" onClick={prevStep}>
                                        Retour
                                    </Button>
                                    <Button className="flex-1 h-16 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20" onClick={nextStep} disabled={!method}>
                                        Confirmer {amount}€ {frequency === 'monthly' ? '/ mois' : ''}
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-10"
                            >
                                {method === 'card' ? (
                                    <div className="py-6 space-y-8 text-center">
                                        <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto relative">
                                            <CreditCard size={44} className="text-primary" />
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-[2rem]"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <h2 className="text-4xl font-black tracking-tighter uppercase italic">Redirection...</h2>
                                            <p className="text-muted-foreground font-medium max-w-sm mx-auto leading-relaxed">
                                                Vous allez être redirigé vers notre plateforme de paiement sécurisée **Stripe** pour finaliser votre don de <strong>{amount}€</strong>.
                                            </p>
                                        </div>
                                        <Button size="lg" className="w-full h-16 bg-blue-600 hover:bg-blue-700 font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 transition-all">
                                            Procéder au paiement <ArrowRight className="ml-3" />
                                        </Button>
                                    </div>
                                ) : method === 'mobile' ? (
                                    <div className="space-y-8 animate-in fade-in duration-500">
                                        <div className="flex flex-col md:flex-row items-center gap-6">
                                            <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center shrink-0">
                                                <Zap size={36} className="text-orange-600" />
                                            </div>
                                            <div className="text-center md:text-left">
                                                <h2 className="text-2xl font-black tracking-tight">Paiement Mobile Money</h2>
                                                <p className="text-muted-foreground text-sm font-medium">Spécifique pour nos donateurs au Mali et en Afrique de l'Ouest.</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                onClick={() => setMobileProvider('orange')}
                                                className={cn(
                                                    "p-6 rounded-2xl border-2 transition-all text-center space-y-3",
                                                    mobileProvider === 'orange' ? "border-orange-500 bg-orange-50" : "border-border hover:border-orange-200"
                                                )}
                                            >
                                                <div className="w-12 h-12 bg-[#FF6600] rounded-xl flex items-center justify-center mx-auto text-white font-bold text-lg">O</div>
                                                <span className="text-[10px] font-black uppercase tracking-widest block">Orange Money</span>
                                            </button>
                                            <button
                                                onClick={() => setMobileProvider('moov')}
                                                className={cn(
                                                    "p-6 rounded-2xl border-2 transition-all text-center space-y-3",
                                                    mobileProvider === 'moov' ? "border-blue-500 bg-blue-50" : "border-border hover:border-blue-200"
                                                )}
                                            >
                                                <div className="w-12 h-12 bg-[#0066CC] rounded-xl flex items-center justify-center mx-auto text-white font-bold text-lg">M</div>
                                                <span className="text-[10px] font-black uppercase tracking-widest block">Moov Money</span>
                                            </button>
                                        </div>

                                        {mobileProvider && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-8 bg-muted rounded-[2rem] border-2 border-border/50 space-y-4"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        "w-3 h-3 rounded-full",
                                                        mobileProvider === 'orange' ? "bg-orange-500" : "bg-blue-500"
                                                    )} />
                                                    <span className="text-xs font-black uppercase tracking-widest">Instruction de transfert</span>
                                                </div>
                                                <p className="text-sm font-medium leading-relaxed italic">
                                                    Veuillez effectuer votre don de {amount}€ au numéro suivant : <br />
                                                    <strong className="text-xl not-italic block mt-2 tracking-widest">+223 70 00 00 00</strong>
                                                    <span className="text-[10px] font-black uppercase opacity-60 block mt-1">Nom: Association TAMAHA</span>
                                                </p>
                                                <div className="pt-4 border-t border-border/50">
                                                    <p className="text-[10px] font-medium text-muted-foreground italic">
                                                        Une fois le transfert effectué, veuillez nous envoyer une capture d'écran via WhatsApp pour confirmation et émission de votre reçu.
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}

                                        <Button variant="outline" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs border-2" onClick={() => setStep(1)}>
                                            Retour à l'accueil
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        <div className="flex flex-col md:flex-row items-center gap-6">
                                            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                                                <Landmark size={36} className="text-primary" />
                                            </div>
                                            <div className="text-center md:text-left">
                                                <h2 className="text-2xl font-black tracking-tight">Coordonnées bancaires</h2>
                                                <p className="text-muted-foreground text-sm font-medium">Veuillez effectuer le virement avec les infos suivantes.</p>
                                            </div>
                                        </div>

                                        <div className="p-8 bg-muted/40 border-2 border-dashed border-primary/20 rounded-[2rem] space-y-6 relative group">
                                            <div className="grid grid-cols-1 gap-6 text-sm">
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Titulaire</span>
                                                    <p className="font-black text-lg">Association TAMAHA</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Banque</span>
                                                    <p className="font-black text-lg">BNP Paribas (SÉNÉGAL)</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">IBAN / Compte</span>
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-black text-lg tracking-wider">SN76 1234 5678 9012 3456</p>
                                                        <Button variant="ghost" size="sm" className="h-8 rounded-full text-[10px] font-black uppercase tracking-widest bg-background border">Copier</Button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-dashed border-primary/10">
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Référence Obligatoire</span>
                                                        <p className="font-black text-lg italic">DON-{Math.floor(Math.random() * 900000) + 100000}</p>
                                                    </div>
                                                    <Zap size={24} className="text-primary/20" />
                                                </div>
                                            </div>
                                        </div>

                                        <Button variant="outline" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs border-2" onClick={() => setStep(1)}>
                                            Fermer & Recommencer
                                        </Button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Security Badge */}
                <div className="px-10 py-6 bg-muted/20 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-background border rounded-lg flex items-center justify-center">
                            <ShieldCheck size={16} className="text-green-500" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                            Paiement 256-bit AES chiffré
                        </span>
                    </div>
                    <div className="flex items-center gap-4 opacity-40 grayscale flex-wrap justify-center">
                        <div className="px-2 py-1 border rounded bg-white font-black text-[8px] text-orange-600">ORANGE</div>
                        <div className="px-2 py-1 border rounded bg-white font-black text-[8px] text-blue-600">MOOV</div>
                        <img src="https://placehold.co/40x20?text=VISA" alt="Visa" />
                        <img src="https://placehold.co/40x20?text=MC" alt="Mastercard" />
                        <img src="https://placehold.co/40x20?text=STRIPE" alt="Stripe" />
                    </div>
                </div>
            </div>
        </div>
    );
}
