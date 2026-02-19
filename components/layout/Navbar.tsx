
"use client";

import * as React from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const mainLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/about', label: 'À propos' },
    { href: '/actions', label: 'Nos Actions' },
    { href: '/events', label: 'Événements' },
    { href: '/blog', label: 'Actualités' },
];

export function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
                        <img src="/logo.jpg" alt="Logo Tamaha" className="h-10 w-10 rounded-full object-cover" />
                        <span>TAMAHA</span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {mainLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === link.href ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/partners" className={cn("text-sm font-medium transition-colors hover:text-primary", pathname === '/partners' ? "text-primary" : "text-muted-foreground")}>Partenaires</Link>
                    <Link href="/contact" className={cn("text-sm font-medium transition-colors hover:text-primary", pathname === '/contact' ? "text-primary" : "text-muted-foreground")}>Contact</Link>
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <Button asChild>
                        <Link href="/donate">Faire un don</Link>
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t p-4 space-y-4 bg-background absolute w-full left-0 top-16 shadow-lg pb-8">
                    <nav className="flex flex-col gap-4">
                        {mainLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-lg font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/partners" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Partenaires</Link>
                        <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Contact</Link>
                        <Button asChild className="w-full mt-4">
                            <Link href="/donate" onClick={() => setMobileMenuOpen(false)}>Faire un don</Link>
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    );
}
