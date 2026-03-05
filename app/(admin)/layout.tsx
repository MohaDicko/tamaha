
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Newspaper,
    Calendar,
    Heart,
    MessageSquare,
    Settings,
    LogOut,
    Plus,
    ArrowUpRight,
    Users,
    Banknote
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
        { icon: Heart, label: "Actions", href: "/admin/actions" },
        { icon: Calendar, label: "Événements", href: "/admin/events" },
        { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
        { icon: Users, label: "Équipe", href: "/admin/team" },
    ];

    return (
        <div className="min-h-screen bg-muted/30 flex">
            {/* Sidebar */}
            <aside className="w-72 bg-card border-r flex flex-col hidden lg:flex">
                <div className="p-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xl shadow-lg shadow-primary/20">
                            T
                        </div>
                        <span className="font-black text-xl tracking-tighter italic italic">TAMAHA</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all",
                                "hover:bg-muted group"
                            )}
                        >
                            <item.icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t space-y-4">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            AD
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest">Admin</span>
                            <span className="text-[9px] text-muted-foreground font-medium truncate max-w-[120px]">admin@tamaha.org</span>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full justify-start gap-4 h-12 rounded-xl text-xs font-black uppercase tracking-widest hover:text-destructive hover:bg-destructive/5"
                    >
                        <LogOut size={16} />
                        Déconnexion
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-card border-b flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">Tableau de bord</h2>
                    <div className="flex items-center gap-4">
                        <Link href="/admin/posts/new">
                            <Button size="sm" className="rounded-full px-6 h-10 font-black uppercase tracking-widest shadow-lg shadow-primary/20 group">
                                <Plus size={16} className="mr-2 group-hover:rotate-90 transition-transform" />
                                Nouveau Contenu
                            </Button>
                        </Link>
                    </div>
                </header>

                <div className="p-8 lg:p-12 overflow-y-auto flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}
