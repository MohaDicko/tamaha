
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
    Search,
    Home,
    Heart,
    Calendar,
    Newspaper,
    Users,
    Phone,
    Info,
    Laptop,
    Moon,
    Sun,
    Mail
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const { setTheme } = useTheme();

    // Toggle the menu when ⌘K or Ctrl+K is pressed
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false);
        command();
    }, []);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-8 right-8 z-[90] flex items-center gap-2 px-4 py-3 rounded-2xl bg-primary text-primary-foreground shadow-2xl shadow-primary/40 hover:scale-110 transition-transform lg:hidden"
            >
                <Search size={20} />
            </button>

            <Command.Dialog
                open={open}
                onOpenChange={setOpen}
                label="Global Command Menu"
                className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            >
                <div className="w-full max-w-2xl bg-card border rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                    <div className="flex items-center border-b px-4">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <Command.Input
                            placeholder="Rechercher une action, un projet..."
                            className="flex h-14 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <Command.List className="max-h-[400px] overflow-y-auto p-4 no-scrollbar">
                        <Command.Empty className="py-6 text-center text-sm">Aucun résultat trouvé.</Command.Empty>

                        <Command.Group heading="Navigation Directe" className="px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-2">
                            <CommandItem icon={Home} onSelect={() => runCommand(() => router.push("/"))}>Accueil</CommandItem>
                            <CommandItem icon={Info} onSelect={() => runCommand(() => router.push("/about"))}>À propos</CommandItem>
                            <CommandItem icon={Heart} onSelect={() => runCommand(() => router.push("/actions"))}>Nos Actions</CommandItem>
                            <CommandItem icon={Calendar} onSelect={() => runCommand(() => router.push("/events"))}>Événements</CommandItem>
                            <CommandItem icon={Newspaper} onSelect={() => runCommand(() => router.push("/blog"))}>Actualités</CommandItem>
                        </Command.Group>

                        <Command.Group heading="Actions" className="px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 my-4">
                            <CommandItem icon={Heart} className="text-primary font-bold" onSelect={() => runCommand(() => router.push("/donate"))}>Faire un don</CommandItem>
                            <CommandItem icon={Users} onSelect={() => runCommand(() => router.push("/partners"))}>Devenir partenaire</CommandItem>
                            <CommandItem icon={Mail} onSelect={() => runCommand(() => router.push("/contact"))}>Nous contacter</CommandItem>
                        </Command.Group>

                        <Command.Group heading="Paramètres" className="px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 my-4">
                            <CommandItem icon={Sun} onSelect={() => runCommand(() => setTheme("light"))}>Mode Clair</CommandItem>
                            <CommandItem icon={Moon} onSelect={() => runCommand(() => setTheme("dark"))}>Mode Sombre</CommandItem>
                            <CommandItem icon={Laptop} onSelect={() => runCommand(() => setTheme("system"))}>Système</CommandItem>
                        </Command.Group>
                    </Command.List>

                    <div className="border-t p-4 bg-muted/30 flex items-center justify-between text-[10px] font-medium text-muted-foreground">
                        <div className="flex items-center gap-4">
                            <span><kbd className="bg-background border rounded px-1.5 py-0.5 mr-1 font-sans">ESC</kbd> Fermer</span>
                            <span><kbd className="bg-background border rounded px-1.5 py-0.5 mr-1 font-sans">↵</kbd> Sélectionner</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Search size={10} />
                            <span>Propulsé par Tammaha Tech</span>
                        </div>
                    </div>
                </div>
            </Command.Dialog>
        </>
    );
}

function CommandItem({
    children,
    icon: Icon,
    onSelect,
    className
}: {
    children: React.ReactNode;
    icon: any;
    onSelect: () => void;
    className?: string;
}) {
    return (
        <Command.Item
            onSelect={onSelect}
            className={cn(
                "relative flex cursor-default select-none items-center rounded-xl px-4 py-3 text-sm outline-none aria-selected:bg-primary/10 aria-selected:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors gap-3",
                className
            )}
        >
            <Icon className="h-4 w-4" />
            <span className="font-bold">{children}</span>
        </Command.Item>
    );
}
