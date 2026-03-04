
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export function WhatsAppButton() {
    const phoneNumber = "22300000000"; // À remplacer par le vrai numéro
    const message = "Bonjour Tamaha, je souhaiterais en savoir plus sur vos actions.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end gap-3">

            {/* Carte popup */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.22 }}
                        className="bg-white border border-slate-200 rounded-2xl shadow-xl p-4 w-64 text-left"
                    >
                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-9 h-9 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                                <MessageCircle size={18} className="text-[#25D366]" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800 leading-tight">Contactez-nous</p>
                                <p className="text-xs text-slate-500 mt-0.5">Nous répondons en quelques heures</p>
                            </div>
                        </div>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#22c35e] transition-colors"
                        >
                            <MessageCircle size={16} />
                            Ouvrir WhatsApp
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bouton principal — compact et discret */}
            <motion.button
                onClick={() => setExpanded(!expanded)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                whileTap={{ scale: 0.92 }}
                className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/35 hover:shadow-xl hover:shadow-[#25D366]/40 hover:scale-105 transition-all flex items-center justify-center relative"
                aria-label="Contacter via WhatsApp"
            >
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
                <AnimatePresence mode="wait">
                    {expanded
                        ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <X size={22} />
                        </motion.div>
                        : <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <MessageCircle size={22} />
                        </motion.div>
                    }
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
