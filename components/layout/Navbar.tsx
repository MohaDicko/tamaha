
"use client";

import * as React from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Menu, X, Heart, LayoutGrid, Info, Calendar, Newspaper,
    Users, Phone, LogIn, LogOut, ShieldCheck
} from 'lucide-react';
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

    // Fermer le menu mobile au changement de route
    React.useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
                scrolled
                    ? "bg-white/90 backdrop-blur-lg py-3 border-b border-slate-200/80 shadow-sm"
                    : "bg-white/60 backdrop-blur-sm py-4 border-b border-transparent"
            )}
        >
            <div className="container flex items-center justify-between gap-4">

                {/* ── Logo ── */}
                <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
                    <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-slate-200 group-hover:border-primary/50 transition-all shadow-sm">
                        <img src="/logo.jpg" alt="Logo Tammaha" className="h-full w-full object-cover transition-transform group-hover:scale-110 duration-500" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-base font-bold tracking-tight text-slate-900">TAMMAHA</span>
                        <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-primary">Solidarité</span>
                    </div>
                </Link>

                {/* ── Navigation Desktop ── */}
                <nav className="hidden lg:flex items-center gap-0.5" aria-label="Navigation principale">
                    {mainLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "px-3.5 py-2 rounded-full text-[13px] font-medium transition-all duration-200",
                                pathname === link.href
                                    ? "bg-primary/10 text-primary font-semibold"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* ── Actions Desktop ── */}
                <div className="hidden lg:flex items-center gap-2 shrink-0">
                    {session ? (
                        <div className="flex items-center gap-1.5">
                            <Link
                                href="/admin"
                                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                            >
                                <ShieldCheck size={15} />
                                Admin
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                title="Se déconnecter"
                                className="p-2.5 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                aria-label="Se déconnecter"
                            >
                                <LogOut size={15} />
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-medium text-slate-500 hover:text-primary hover:bg-slate-100 border border-slate-200 hover:border-primary/30 transition-all"
                            title="Espace administrateur"
                        >
                            <LogIn size={14} />
                            Admin
                        </Link>
                    )}
                    <Button
                        className="rounded-full px-6 h-10 text-[13px] font-semibold bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/25 transition-all"
                        asChild
                    >
                        <Link href="/donate">Donner</Link>
                    </Button>
                </div>

                {/* ── Toggle Mobile ── */}
                <button
                    className="lg:hidden p-2 rounded-xl text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* ── Menu Mobile ── */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="lg:hidden overflow-hidden bg-white border-t border-slate-100"
                    >
                        <div className="container py-4 flex flex-col gap-1">
                            {/* Liens navigation */}
                            {mainLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium transition-all",
                                        pathname === link.href
                                            ? "bg-primary/8 text-primary font-semibold"
                                            : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                                    )}
                                >
                                    <link.icon size={17} className={pathname === link.href ? "text-primary" : "text-slate-400"} />
                                    {link.label}
                                </Link>
                            ))}

                            {/* Séparateur */}
                            <div className="border-t border-slate-100 my-2" />

                            {/* CTA Mobile */}
                            <div className="flex flex-col gap-2 px-2 pb-2">
                                <Button size="default" className="w-full h-12 rounded-xl font-semibold text-[15px] bg-primary text-white shadow-md" asChild>
                                    <Link href="/donate">Faire un don</Link>
                                </Button>

                                {session ? (
                                    <div className="flex gap-2">
                                        <Button variant="outline" className="flex-1 h-11 rounded-xl font-medium text-[14px]" asChild>
                                            <Link href="/admin">
                                                <ShieldCheck size={15} className="mr-2" />
                                                Admin
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="h-11 w-11 rounded-xl text-red-400 hover:text-red-600 hover:bg-red-50 p-0"
                                            onClick={() => signOut({ callbackUrl: '/' })}
                                            aria-label="Se déconnecter"
                                        >
                                            <LogOut size={16} />
                                        </Button>
                                    </div>
                                ) : (
                                    <Button variant="outline" className="w-full h-11 rounded-xl font-medium text-[14px] text-slate-600" asChild>
                                        <Link href="/login">
                                            <LogIn size={15} className="mr-2" />
                                            Connexion Admin
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
