
"use client";

import * as React from "react";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Menu, X, Heart, LayoutGrid, Info, Calendar, Newspaper,
    Users, Phone, LogIn, LogOut, ShieldCheck
} from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from "next-auth/react";

const mainLinks = [
    { href: '/', label: 'Accueil', icon: LayoutGrid },
    { href: '/about', label: 'À propos', icon: Info },
    { href: '/actions', label: 'Nos Actions', icon: Heart },
    { href: '/events', label: 'Événements', icon: Calendar },
    { href: '/blog', label: 'Actualités', icon: Newspaper },
    { href: '/partners', label: 'Partenaires', icon: Users },
    { href: '/contact', label: 'Contact', icon: Phone },
];

export function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    React.useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={cn(
                "fixed top-4 left-0 right-0 z-[100] transition-all duration-500 container mx-auto",
                scrolled
                    ? "px-4"
                    : "px-6"
            )}
        >
            <nav
                className={cn(
                    "transition-all duration-500 rounded-[2rem] flex items-center justify-between gap-4 px-6 md:px-8 py-3 border border-white/20",
                    scrolled
                        ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-premium py-3"
                        : "bg-white/40 dark:bg-black/20 backdrop-blur-md py-4"
                )}
            >
                {/* ── Logo ── */}
                <Link href="/" className="flex items-center gap-3 shrink-0 group">
                    <div className="relative h-10 w-10 overflow-hidden rounded-2xl border-2 border-primary/20 group-hover:border-primary/50 transition-all shadow-soft group-hover:rotate-3">
                        <Image src="/logo.jpg" alt="Logo Tammaha" fill priority sizes="40px" className="object-cover transition-transform group-hover:scale-110 duration-700" />
                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-lg font-black tracking-tighter text-foreground group-hover:text-primary transition-colors italic">TAMMAHA</span>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary">Solidarité</span>
                            <div className="w-1 h-1 bg-primary/20 rounded-full" />
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground">Développement</span>
                        </div>
                    </div>
                </Link>

                {/* ── Desktop Links ── */}
                <div className="hidden lg:flex items-center gap-1 bg-muted/30 p-1 rounded-2xl border border-border/40">
                    {mainLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all relative group",
                                    isActive
                                        ? "text-primary bg-background shadow-soft"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute inset-0 bg-background rounded-xl shadow-soft -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* ── Desktop Actions ── */}
                <div className="hidden lg:flex items-center gap-3">
                    <LanguageSwitcher />

                    <div className="h-6 w-px bg-border/60 mx-1" />

                    {session ? (
                        <Link href="/admin">
                            <Button variant="outline" size="sm" className="rounded-xl h-10 px-4 text-[10px] font-black uppercase tracking-widest border-2 gap-2 hover:bg-primary/5 hover:text-primary">
                                <ShieldCheck size={14} /> Admin
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <Button variant="ghost" size="sm" className="rounded-xl h-10 px-4 text-[10px] font-black uppercase tracking-widest gap-2">
                                <LogIn size={14} /> Espace Admin
                            </Button>
                        </Link>
                    )}

                    <Button
                        className="rounded-xl px-6 h-10 text-[10px] font-black uppercase tracking-widest bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 hover:scale-[1.03] transition-all"
                        asChild
                    >
                        <Link href="/donate">Faire un Don ❤️</Link>
                    </Button>
                </div>

                {/* ── Mobile Toggle ── */}
                <button
                    className="lg:hidden p-3 rounded-2xl text-foreground bg-muted/50 border border-border/50 hover:bg-muted transition-colors active:scale-95"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </nav>

            {/* ── Mobile Menu ── */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="lg:hidden absolute top-20 left-4 right-4 z-50 overflow-hidden bg-white/95 dark:bg-black/95 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 shadow-premium"
                    >
                        <div className="p-6 flex flex-col gap-2">
                            {mainLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "flex items-center gap-4 px-6 py-4 rounded-2xl text-[14px] font-black uppercase tracking-widest transition-all",
                                        pathname === link.href
                                            ? "bg-primary text-white shadow-xl shadow-primary/20"
                                            : "text-muted-foreground hover:bg-muted"
                                    )}
                                >
                                    <link.icon size={18} />
                                    {link.label}
                                </Link>
                            ))}

                            <div className="h-px bg-border/50 my-4" />

                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="h-14 rounded-2xl font-black uppercase tracking-widest text-[11px]" asChild>
                                    <Link href="/login">Compte Admin</Link>
                                </Button>
                                <div className="flex items-center justify-center bg-muted rounded-2xl h-14">
                                    <LanguageSwitcher />
                                </div>
                            </div>

                            <Button size="lg" className="w-full h-16 rounded-[1.5rem] font-black uppercase tracking-widest text-sm bg-primary text-white shadow-xl shadow-primary/20 mt-2" asChild>
                                <Link href="/donate">Faire un don ❤️</Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
