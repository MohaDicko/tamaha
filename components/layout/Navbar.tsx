
"use client";

import * as React from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, Heart, LayoutGrid, Info, Calendar, Newspaper, Users, Phone, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from "next-auth/react";

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
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
                scrolled
                    ? "bg-white/80 backdrop-blur-md py-4 border-b border-slate-200 shadow-sm"
                    : "bg-transparent py-6 border-transparent"
            )}
        >
            <div className="container flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-3 font-bold text-2xl tracking-tighter group">
                        <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-slate-200 group-hover:border-primary transition-all duration-500 shadow-sm">
                            <img src="/logo.jpg" alt="Logo Tamaha" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className={cn("text-xl font-black tracking-tight transition-colors", scrolled ? "text-slate-900" : "text-slate-900")}>TAMAHA</span>
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Solidarité</span>
                        </div>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1">
                    {mainLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-300",
                                pathname === link.href
                                    ? "bg-primary/10 text-primary"
                                    : "text-slate-600 hover:text-primary hover:bg-slate-50"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden lg:flex items-center gap-4">
                    {session && (
                        <Link
                            href="/admin"
                            className="text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2"
                        >
                            <LayoutDashboard size={14} />
                            Admin
                        </Link>
                    )}
                    <Button className="rounded-full px-8 h-11 font-bold uppercase tracking-widest bg-primary text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/20" asChild>
                        <Link href="/donate">Donner</Link>
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden rounded-xl text-slate-600 border border-slate-200"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden fixed inset-0 z-[-1] bg-white pt-24 px-6 border-b border-slate-100 shadow-2xl"
                    >
                        <nav className="flex flex-col space-y-1">
                            {mainLinks.map((link) => (
                                <motion.div key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            "flex items-center justify-between text-lg font-bold uppercase tracking-tight p-5 rounded-2xl transition-all",
                                            pathname === link.href
                                                ? "bg-primary/5 text-primary"
                                                : "text-slate-600 hover:bg-slate-50"
                                        )}
                                    >
                                        {link.label}
                                        <ArrowRight size={20} className={pathname === link.href ? "opacity-100" : "opacity-20"} />
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <div className="mt-8 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 text-center">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Agissez pour le changement</p>
                            <Button size="lg" className="w-full rounded-xl h-14 font-bold uppercase tracking-widest text-xs bg-primary text-white" asChild>
                                <Link href="/donate" onClick={() => setMobileMenuOpen(false)}>
                                    Faire un don
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

const ArrowRight = ({ size, className }: { size: number; className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);
