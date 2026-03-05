"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Banknote,
    Clock,
    CheckCircle2,
    XCircle,
    ArrowRight,
    Filter,
    Search,
    RefreshCcw,
    Smartphone,
    CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Donation = {
    id: string;
    amount: number;
    method: string;
    provider: string | null;
    status: string;
    frequency: string;
    createdAt: string;
};

export default function AdminDonationsPage() {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDonations = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/donations");
            if (!res.ok) throw new Error("Erreur lors de la récupération");
            const data = await res.json();
            setDonations(data);
        } catch (error) {
            toast.error("Impossible de charger les dons");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonations();
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch("/api/admin/donations", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });
            if (!res.ok) throw new Error("Erreur mise à jour");

            toast.success("Statut mis à jour avec succès !");
            fetchDonations(); // Refresh the list
        } catch (error) {
            toast.error("Erreur, veuillez réessayer.");
            console.error(error);
        }
    };

    const pendingCount = donations.filter(d => d.status === "PENDING").length;
    const totalCollected = donations
        .filter(d => d.status === "COMPLETED")
        .reduce((sum, d) => sum + d.amount, 0);

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter">Gestion des <span className="text-primary italic">Dons</span></h1>
                    <p className="text-muted-foreground text-sm font-medium">Validez les promesses de dons et suivez vos collectes.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-12 px-6 rounded-2xl bg-card border-2 flex items-center gap-3">
                        <span className="text-sm font-black uppercase tracking-widest text-muted-foreground">Total Récolté:</span>
                        <span className="text-2xl font-black text-primary">{totalCollected.toLocaleString("fr-FR")} FCFA</span>
                    </div>
                    {pendingCount > 0 && (
                        <div className="h-12 px-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">{pendingCount} en attente</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input placeholder="Rechercher (ex: Orange, Wave...)" className="h-14 pl-12 rounded-2xl bg-card border-2 border-border/50 focus:border-primary/20 transition-all font-bold" />
                </div>
                <Button
                    variant="outline"
                    className="h-14 rounded-2xl border-2 px-6 font-black uppercase tracking-widest text-[10px] gap-2"
                    onClick={fetchDonations}
                    disabled={loading}
                >
                    <RefreshCcw size={16} className={cn(loading && "animate-spin")} /> Rafraîchir
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            ) : donations.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground font-medium">
                    Aucun don trouvé.
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {donations.map((don, i) => (
                        <motion.div
                            key={don.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={cn(
                                "group p-6 bg-card border-2 rounded-[2rem] transition-all relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6",
                                don.status === "PENDING" ? "border-amber-500/30 bg-amber-500/[0.02]" : "border-border/50",
                                don.status === "COMPLETED" && "border-green-500/30 bg-green-500/[0.02]"
                            )}
                        >
                            {/* Icon & Details */}
                            <div className="flex items-center gap-6 w-full lg:w-auto">
                                <div className={cn(
                                    "w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-sm",
                                    don.status === "PENDING" ? "bg-amber-100 text-amber-600" :
                                        don.status === "COMPLETED" ? "bg-green-100 text-green-600" :
                                            "bg-muted text-muted-foreground"
                                )}>
                                    {don.method === "mobile" ? <Smartphone size={28} /> :
                                        don.method === "card" ? <CreditCard size={28} /> :
                                            <Banknote size={28} />}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black tracking-tight">{don.amount.toLocaleString("fr-FR")} FCFA</h3>
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        <span>{don.provider || don.method}</span>
                                        <span>•</span>
                                        <span>{don.frequency === "monthly" ? "Mensuel" : "Ponctuel"}</span>
                                    </div>
                                    <div className="text-[10px] text-muted-foreground/70 font-medium">
                                        {new Date(don.createdAt).toLocaleString("fr-FR", {
                                            day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Actions / Status */}
                            <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
                                {don.status === "PENDING" ? (
                                    <>
                                        <Button
                                            variant="outline"
                                            className="rounded-xl h-12 px-6 font-black uppercase tracking-widest text-[10px] text-destructive hover:bg-destructive hover:text-white border-destructive/20"
                                            onClick={() => updateStatus(don.id, "FAILED")}
                                        >
                                            <XCircle size={14} className="mr-2" /> Rejeter
                                        </Button>
                                        <Button
                                            className="rounded-xl h-12 px-6 font-black uppercase tracking-widest text-[10px] bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20"
                                            onClick={() => updateStatus(don.id, "COMPLETED")}
                                        >
                                            <CheckCircle2 size={14} className="mr-2" /> Valider
                                        </Button>
                                    </>
                                ) : (
                                    <div className={cn(
                                        "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border",
                                        don.status === "COMPLETED" ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-destructive/10 text-destructive border-destructive/20"
                                    )}>
                                        {don.status === "COMPLETED" ? "Validé" : "Rejeté"}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
