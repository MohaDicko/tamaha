
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
                "sticky top-0 z-[100] w-full transition-all duration-300 border-b",
                scrolled
                    ? "bg-background/80 backdrop-blur-xl border-border py-2 shadow-sm"
                    : "bg-background py-4 border-transparent"
            )}
        >
            <div className="container flex h-16 items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-3 font-black text-2xl tracking-tighter group">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary/20 group-hover:border-primary transition-colors">
                            <img src="/logo.jpg" alt="Logo Tamaha" className="h-full w-full object-cover" />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
                            TAMAHA
                        </span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1 bg-muted/30 p-1 rounded-full border border-border/50">
                    {mainLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full transition-all hover:text-primary",
                                pathname === link.href
                                    ? "bg-background text-primary shadow-sm"
                                    : "text-muted-foreground"
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
                            className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 mr-2"
                        >
                            <LayoutDashboard size={14} />
                            Admin
                        </Link>
                    )}
                    <Button size="sm" className="rounded-full px-6 h-10 font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-transform" asChild>
                        <Link href="/donate">Faire un don</Link>
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden rounded-full bg-muted/50"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </Button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden border-t bg-background overflow-hidden absolute w-full left-0 top-full shadow-2xl"
                    >
                        <nav className="flex flex-col p-6 space-y-1">
                            {mainLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                        "flex items-center gap-4 text-sm font-black uppercase tracking-widest p-4 rounded-2xl transition-all",
                                        pathname === link.href
                                            ? "bg-primary/10 text-primary"
                                            : "hover:bg-muted"
                                    )}
                                >
                                    <link.icon size={18} />
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-6">
                                <Button size="lg" className="w-full rounded-2xl h-14 font-black uppercase tracking-widest text-base shadow-xl shadow-primary/20" asChild>
                                    <Link href="/donate" onClick={() => setMobileMenuOpen(false)}>
                                        Faire un don maintenant
                                    </Link>
                                </Button>
                            </div>
                        </nav>
                        <div className="p-8 bg-muted/30 border-t flex justify-center gap-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">© Tamaha 2024</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
