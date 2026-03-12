"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ChatBot } from "@/components/ui/ChatBot";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <>
            <main className="min-h-screen">
                {children}
            </main>

            {/* Intégration globale de l'IA sur toutes les pages publiques */}
            <ChatBot />
        </>
    );
}
