
"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
    const phoneNumber = "22300000000"; // À remplacer par le vrai numéro
    const message = "Bonjour Tamaha, je souhaiterais en savoir plus sur vos actions.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-full shadow-2xl shadow-[#25D366]/30 group transition-all"
        >
            <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20" />
                <MessageCircle size={24} className="relative z-10" />
            </div>
            <span className="font-black uppercase tracking-widest text-xs">Contact WhatsApp</span>

            {/* Tooltip style popup on hover */}
            <div className="absolute bottom-full right-0 mb-4 w-48 p-4 bg-card border-2 border-border shadow-2xl rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none translate-y-2 group-hover:translate-y-0 duration-300">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Discutez avec nous</p>
                <p className="text-[9px] text-muted-foreground font-medium italic">Nous répondons généralement en quelques heures.</p>
            </div>
        </motion.a>
    );
}
