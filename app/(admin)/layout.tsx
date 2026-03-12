
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Newspaper,
    Calendar,
    Heart,
    MessageSquare,
    LogOut,
    Plus,
    Users,
    Banknote,
    Menu,
    X,
    ExternalLink
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) return null;

    const menuItems = [
        { icon: LayoutDashboard, label: "Vue d'ensemble", href: "/admin" },
        { icon: Banknote, label: "Dons", href: "/admin/donations" },
        { icon: Newspaper, label: "Articles", href: "/admin/posts" },
        { icon: Heart, label: "Actions", href: "/admin/projects" },
        { icon: Calendar, label: "Événements", href: "/admin/events" },
        { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
        { icon: Users, label: "Équipe", href: "/admin/team" },
    ];

    return (
        <div className="min-h-screen bg-muted/20 flex flex-col lg:flex-row">
            {/* Mobile Header */}
            <header className="lg:hidden h-16 bg-card border-b flex items-center justify-between px-6 sticky top-0 z-[60]">
                <Link href="/admin" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-black text-sm">T</div>
                    <span className="font-black text-sm tracking-tighter">ADMIN</span>
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-xl bg-muted text-foreground"
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </header>

            {/* Sidebar Desktop */}
            <aside className="w-72 bg-card border-r flex flex-col hidden lg:flex sticky top-0 h-screen">
                <div className="p-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xl shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                            T
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-xl tracking-tighter italic">TAMMAHA</span>
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary -mt-1">ADMINISTRATEUR</span>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto no-scrollbar">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all relative group",
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-primary/5 rounded-2xl border border-primary/10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <item.icon size={18} className={cn("transition-colors relative z-10", isActive ? "text-primary" : "group-hover:text-foreground")} />
                                <span className="relative z-10">{item.label}</span>
                                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary relative z-10 shadow-sm" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 mt-auto">
                    <div className="bg-muted/40 rounded-3xl p-5 space-y-4 border border-border/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold shadow-inner">
                                AD
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-widest">Admin</span>
                                <span className="text-[9px] text-muted-foreground font-medium truncate max-w-[120px]">admin@tammaha.org</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Link href="/" target="_blank">
                                <Button variant="outline" size="sm" className="w-full justify-center gap-2 h-10 rounded-xl text-[9px] font-black uppercase tracking-widest border-2">
                                    <ExternalLink size={14} />
                                    Voir le Site
                                </Button>
                            </Link>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="w-full justify-center gap-2 h-10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:text-destructive hover:bg-destructive/10"
                            >
                                <LogOut size={14} />
                                Déconnexion
                            </Button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="fixed inset-0 z-[70] lg:hidden bg-card p-6 flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xl">T</div>
                                <span className="font-black text-xl tracking-tighter">TAMMAHA</span>
                            </div>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-xl bg-muted"><X size={20} /></button>
                        </div>
                        <nav className="flex-1 space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        "flex items-center gap-4 px-6 py-4 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all",
                                        pathname === item.href ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-muted"
                                    )}
                                >
                                    <item.icon size={20} />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="border-t pt-6 mt-6">
                            <Button onClick={() => signOut({ callbackUrl: "/" })} variant="destructive" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest gap-2">
                                <LogOut size={18} /> Déconnexion
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
                {/* Desktop Header */}
                <header className="h-20 bg-card border-b hidden lg:flex items-center justify-between px-10 sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <div className="flex bg-muted p-1 rounded-2xl backdrop-blur-md shadow-inner">
                            <Link href="/admin">
                                <button className={cn("px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.12em] transition-all", pathname === "/admin" ? "bg-background shadow-soft text-primary" : "text-muted-foreground hover:text-foreground")}>Dashboard</button>
                            </Link>
                            <Link href="/admin/posts">
                                <button className={cn("px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.12em] transition-all", pathname.startsWith("/admin/posts") ? "bg-background shadow-soft text-primary" : "text-muted-foreground hover:text-foreground")}>Contenu</button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/admin/posts/new">
                            <Button size="sm" className="rounded-2xl px-6 h-11 font-black uppercase tracking-widest shadow-xl shadow-primary/20 group hover:scale-[1.02] transition-all">
                                <Plus size={16} className="mr-2 group-hover:rotate-90 transition-transform" />
                                Nouveau
                            </Button>
                        </Link>
                    </div>
                </header>

                <div className="p-6 lg:p-12 overflow-y-auto flex-1 bg-gradient-to-br from-muted/20 to-background">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
