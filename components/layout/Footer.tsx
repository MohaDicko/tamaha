
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from "react";
import { Facebook, Twitter, Instagram, Mail, ArrowRight, ShieldCheck, Send, Loader2 } from 'lucide-react';
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Container } from './Container';

export function Footer() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleNewsletter = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) throw new Error();

            toast.success("Bienvenue ! Vérifiez votre boîte mail.");
            setEmail("");
        } catch (err) {
            toast.error("Une erreur est survenue.");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <footer className="border-t bg-card pt-20 pb-10">
            <Container>
                <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                                T
                            </div>
                            <span className="font-black text-2xl tracking-tighter italic">TAMAHA</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                            Une association engagée pour un avenir meilleur au Mali, centrée sur l'éducation, la santé et le développement communautaire.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground mb-6">Navigation</h3>
                        <ul className="space-y-4 text-sm font-bold text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary transition-colors">Notre Vision</Link></li>
                            <li><Link href="/actions" className="hover:text-primary transition-colors">Projets & Actions</Link></li>
                            <li><Link href="/events" className="hover:text-primary transition-colors">Agenda Événements</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Journal d'Actu</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground mb-6">Engagement</h3>
                        <ul className="space-y-4 text-sm font-bold text-muted-foreground">
                            <li><Link href="/donate" className="hover:text-primary transition-colors">Soutenir (Don)</Link></li>
                            <li><Link href="/partners" className="hover:text-primary transition-colors">Partenariats</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Rejoindre l'équipe</Link></li>
                            <li><Link href="/legal/privacy" className="hover:text-primary transition-colors">Confidentialité</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground mb-6">Newsletter</h3>
                        <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                            Recevez nos actualités et l'impact de vos dons directement par email.
                        </p>
                        <form onSubmit={handleNewsletter} className="flex gap-2 p-1 bg-muted rounded-2xl border border-border/50 focus-within:border-primary/30 transition-all">
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="votre-email@exemple.com"
                                className="bg-transparent border-0 focus-visible:ring-0 h-10 font-bold placeholder:text-muted-foreground/50"
                                required
                            />
                            <Button size="icon" disabled={isLoading} className="rounded-xl shrink-0 h-10 w-10 shadow-lg shadow-primary/20">
                                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                            </Button>
                        </form>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-60">
                            <ShieldCheck size={12} className="text-green-500" />
                            RGPD Compliant
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                        © {new Date().getFullYear()} TAMAHA ASSOCIATION. DESIGNED BY TAMAHA TECH.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/legal/terms" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary">Conditions</Link>
                        <Link href="/legal/privacy" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary">Sécurité</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
