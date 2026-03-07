"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2, Sparkles, AlertCircle, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Identifiants invalides. Veuillez réessayer.");
                toast.error("Erreur de connexion");
            } else {
                toast.success("Connexion réussie !");
                router.push("/admin");
                router.refresh();
            }
        } catch (err) {
            setError("Une erreur est survenue.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#050505]">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[700px] h-[700px] bg-primary/20 rounded-full blur-[150px] opacity-50" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] opacity-30" />
            </div>

            <Container className="relative z-10 w-full max-w-md px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                >
                    {/* Logo Section */}
                    <div className="flex flex-col items-center text-center space-y-4">
                        <Link href="/" className="group">
                            <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white shadow-2xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                                <ShieldCheck size={32} />
                            </div>
                        </Link>
                        <div className="space-y-2">
                            <h1 className="text-3xl font-black tracking-tighter text-white italic">
                                ADMIN <span className="text-primary italic">PANEL</span>
                            </h1>
                            <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.2em] opacity-60">
                                Association Tammaha
                            </p>
                        </div>
                    </div>

                    {/* Login Card */}
                    <div className="relative group">
                        {/* Glossy Card Border Effect */}
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/50 to-blue-500/50 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

                        <div className="relative bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-3 p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-black uppercase tracking-widest"
                                    >
                                        <AlertCircle size={16} />
                                        {error}
                                    </motion.div>
                                )}

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/60 ml-1">
                                            Identifiant
                                        </Label>
                                        <div className="relative group/input">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within/input:text-primary transition-colors">
                                                <User size={18} />
                                            </div>
                                            <Input
                                                type="text"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="admin"
                                                className="h-14 pl-12 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-primary/20 focus:bg-white/10 transition-all font-bold"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between px-1">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-white/60">
                                                Mot de passe
                                            </Label>
                                            <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
                                                Oublié ?
                                            </Link>
                                        </div>
                                        <div className="relative group/input">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within/input:text-primary transition-colors">
                                                <Lock size={18} />
                                            </div>
                                            <Input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="admin"
                                                className="h-14 pl-12 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-primary/20 focus:bg-white/10 transition-all font-bold"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-16 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95 flex items-center justify-center gap-3"
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        <>
                                            Se connecter <ArrowRight size={18} />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="flex flex-col items-center gap-4 pt-4">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40">
                            <Sparkles size={12} className="text-primary" />
                            Accès réservé au bureau de l'association
                        </div>
                        <Link
                            href="/"
                            className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors flex items-center gap-2"
                        >
                            ← Retour au site public
                        </Link>
                    </div>
                </motion.div>
            </Container>
        </div>
    );
}

function Container({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("mx-auto w-full", className)}>
            {children}
        </div>
    );
}
