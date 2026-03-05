"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Turnstile } from '@marsidev/react-turnstile';
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
    const [turnstileToken, setTurnstileToken] = useState("");

    const handleNewsletter = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        if (!turnstileToken) {
            toast.error("Veuillez patienter, validation anti-robot en cours.");
            return;
        }

        setStatus("loading");
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, turnstileToken })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erreur");
            setStatus("success");
            toast.success("Inscription réussie !");
            setEmail("");
            // Token is single-use, it will be refreshed if Turnstile component is re-rendered or reset, but for footer let's keep it simple.
        } catch (err: any) {
            toast.error(err.message || "Erreur lors de l'inscription");
            setStatus("idle");
        }
    };

    return (
        <footer className="bg-slate-50 border-t border-slate-100 pt-24 pb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <Container className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-3 font-bold text-xl tracking-tight text-slate-900 group">
                            <div className="h-10 w-10 overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                                <img src="/logo.jpg" alt="Logo" className="h-full w-full object-cover" />
                            </div>
                            TAMAHA
                        </Link>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">
                            Association loi 1901 dédiée à la solidarité internationale et au développement durable des populations vulnérables.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm">
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            {['Accueil', 'Nos Actions', 'Le Journal', 'Contact', 'Faire un Don'].map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-sm text-slate-600 font-bold hover:text-primary transition-colors">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-sm text-slate-600 font-bold">
                                <Mail size={16} className="text-primary" />
                                contact@tamaha.org
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 font-bold">
                                <Phone size={16} className="text-primary" />
                                +223 85 05 02 02
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600 font-bold">
                                <MapPin size={16} className="text-primary mt-1" />
                                Siège Niamana Dougoukoro
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Journal de bord</h4>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                Recevez nos actualités du terrain directement dans votre boîte mail.
                            </p>
                        </div>
                        <form onSubmit={handleNewsletter} className="relative group">
                            {status === "success" ? (
                                <div className="w-full h-14 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 flex items-center gap-3 font-bold text-xs shadow-sm">
                                    <CheckCircle2 size={18} /> Inscription validée !
                                </div>
                            ) : (
                                <>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="votre@email.com"
                                        disabled={status === "loading"}
                                        className="w-full h-14 bg-white border border-slate-200 rounded-xl pl-6 pr-14 py-4 text-xs font-bold focus:outline-none focus:border-primary transition-colors shadow-sm disabled:opacity-50"
                                    />
                                    <Button type="submit" disabled={status === "loading"} className="absolute right-2 top-2 h-10 w-10 rounded-lg p-0 bg-primary text-white">
                                        {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                                    </Button>

                                    <div className="hidden">
                                        <Turnstile
                                            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                                            onSuccess={(t) => setTurnstileToken(t)}
                                        />
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        © 2024 Association Tamaha. Tous droits réservés.
                    </p>
                    <div className="flex gap-8">
                        {['Conditions', 'Confidentialité', 'Légal'].map(l => (
                            <Link key={l} href="#" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">{l}</Link>
                        ))}
                    </div>
                </div>
            </Container>
        </footer>
    );
}
