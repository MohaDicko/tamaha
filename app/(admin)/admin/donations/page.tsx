"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
    Banknote,
    Clock,
    CheckCircle2,
    XCircle,
    Search,
    RefreshCcw,
    Smartphone,
    CreditCard,
    TrendingUp,
    X,
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

type FilterStatus = "all" | "PENDING" | "COMPLETED" | "FAILED";

export default function AdminDonationsPage() {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

    const fetchDonations = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/donations");
            if (!res.ok) throw new Error("Erreur lors de la récupération");
            const data = await res.json();
            setDonations(data);
        } catch (error) {
            toast.error("Impossible de charger les dons");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonations();
    }, []);

    // ✅ Mise à jour optimiste (cohérent avec la page Messages)
    const updateStatus = async (id: string, newStatus: string) => {
        const previous = donations.find((d) => d.id === id)?.status;
        setDonations((prev) =>
            prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
        );
        try {
            const res = await fetch("/api/admin/donations", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });
            if (!res.ok) throw new Error("Erreur mise à jour");
            toast.success("Statut mis à jour !");
        } catch {
            // Rollback
            setDonations((prev) =>
                prev.map((d) => (d.id === id ? { ...d, status: previous! } : d))
            );
            toast.error("Erreur, veuillez réessayer.");
        }
    };

    // ✅ Recherche + filtre actifs côté client
    const filteredDonations = useMemo(() => {
        return donations.filter((d) => {
            const term = searchTerm.toLowerCase();
            const matchSearch =
                !searchTerm ||
                (d.provider || d.method).toLowerCase().includes(term) ||
                d.amount.toString().includes(term);
            const matchStatus = filterStatus === "all" || d.status === filterStatus;
            return matchSearch && matchStatus;
        });
    }, [donations, searchTerm, filterStatus]);

    // Stats calculées
    const totalCollected = donations.filter((d) => d.status === "COMPLETED").reduce((s, d) => s + d.amount, 0);
    const pendingCount = donations.filter((d) => d.status === "PENDING").length;
    const pendingAmount = donations.filter((d) => d.status === "PENDING").reduce((s, d) => s + d.amount, 0);

    const statusConfig: Record<string, { label: string; color: string }> = {
        all: { label: "Tous", color: "" },
        PENDING: { label: "En attente", color: "amber" },
        COMPLETED: { label: "Validés", color: "green" },
        FAILED: { label: "Rejetés", color: "red" },
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter">
                        Gestion des <span className="text-primary italic">Dons</span>
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium">
                        Validez les promesses de dons et suivez vos collectes.
                    </p>
                </div>

                {/* KPIs rapides */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="h-14 px-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center gap-3">
                        <TrendingUp size={18} className="text-primary" />
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Récolté</p>
                            <p className="text-lg font-black text-primary leading-tight">
                                {totalCollected.toLocaleString("fr-FR")} FCFA
                            </p>
                        </div>
                    </div>
                    {pendingCount > 0 && (
                        <div className="h-14 px-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-amber-600">{pendingCount} en attente</p>
                                <p className="text-sm font-black text-amber-700 leading-tight">
                                    {pendingAmount.toLocaleString("fr-FR")} FCFA
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-3xl border-2 border-border/50">
                {/* Recherche */}
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                        placeholder="Rechercher par opérateur, montant..."
                        className="h-12 pl-12 rounded-2xl bg-muted/30 border-transparent focus:border-primary/20 transition-all font-bold"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            <X size={16} />
                        </button>
                    )}
                </div>
                {/* Filtres statut */}
                <div className="flex items-center gap-2 flex-wrap">
                    {(["all", "PENDING", "COMPLETED", "FAILED"] as FilterStatus[]).map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={cn(
                                "h-12 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2",
                                filterStatus === s
                                    ? "bg-primary border-primary text-white"
                                    : "bg-muted border-transparent text-muted-foreground hover:border-muted-foreground/20"
                            )}
                        >
                            {statusConfig[s].label}
                        </button>
                    ))}
                    <Button
                        variant="outline"
                        className="h-12 rounded-2xl border-2 px-4 font-black uppercase tracking-widest text-[10px] gap-2"
                        onClick={fetchDonations}
                        disabled={loading}
                    >
                        <RefreshCcw size={16} className={cn(loading && "animate-spin")} />
                    </Button>
                </div>
            </div>

            {/* Liste */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            ) : filteredDonations.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground font-medium flex flex-col items-center gap-4">
                    <Banknote size={48} className="opacity-20" />
                    <p>{searchTerm ? `Aucun résultat pour "${searchTerm}"` : "Aucun don trouvé."}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredDonations.map((don, i) => (
                        <motion.div
                            key={don.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className={cn(
                                "group p-6 bg-card border-2 rounded-[2rem] transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6",
                                don.status === "PENDING" ? "border-amber-500/30 bg-amber-500/[0.02]" :
                                    don.status === "COMPLETED" ? "border-green-500/30 bg-green-500/[0.02]" :
                                        "border-destructive/20 bg-destructive/[0.01]"
                            )}
                        >
                            {/* Icône + Montant */}
                            <div className="flex items-center gap-5 flex-1">
                                <div className={cn(
                                    "w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm shrink-0",
                                    don.status === "PENDING" ? "bg-amber-100 text-amber-600" :
                                        don.status === "COMPLETED" ? "bg-green-100 text-green-600" :
                                            "bg-muted text-muted-foreground"
                                )}>
                                    {don.method === "mobile" ? <Smartphone size={24} /> :
                                        don.method === "card" ? <CreditCard size={24} /> :
                                            <Banknote size={24} />}
                                </div>
                                <div className="space-y-1 min-w-0">
                                    <h3 className="text-2xl font-black tracking-tight leading-none">
                                        {don.amount.toLocaleString("fr-FR")} <span className="text-sm text-muted-foreground">FCFA</span>
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground flex-wrap">
                                        <span className="capitalize">{don.provider || don.method}</span>
                                        <span>•</span>
                                        <span>{don.frequency === "monthly" ? "Mensuel" : "Ponctuel"}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={10} />
                                            {new Date(don.createdAt).toLocaleString("fr-FR", {
                                                day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 w-full lg:w-auto justify-end shrink-0">
                                {don.status === "PENDING" ? (
                                    <>
                                        <Button
                                            variant="outline"
                                            className="rounded-xl h-11 px-5 font-black uppercase tracking-widest text-[10px] text-destructive hover:bg-destructive hover:text-white border-destructive/20 gap-2"
                                            onClick={() => updateStatus(don.id, "FAILED")}
                                        >
                                            <XCircle size={14} /> Rejeter
                                        </Button>
                                        <Button
                                            className="rounded-xl h-11 px-5 font-black uppercase tracking-widest text-[10px] bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20 gap-2"
                                            onClick={() => updateStatus(don.id, "COMPLETED")}
                                        >
                                            <CheckCircle2 size={14} /> Valider
                                        </Button>
                                    </>
                                ) : (
                                    <div className={cn(
                                        "px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest border",
                                        don.status === "COMPLETED"
                                            ? "bg-green-500/10 text-green-600 border-green-500/20"
                                            : "bg-destructive/10 text-destructive border-destructive/20"
                                    )}>
                                        {don.status === "COMPLETED" ? "✓ Validé" : "✗ Rejeté"}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Footer stats */}
            {!loading && donations.length > 0 && (
                <div className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    {filteredDonations.length} don{filteredDonations.length !== 1 ? "s" : ""} affiché{filteredDonations.length !== 1 ? "s" : ""}
                    {filterStatus !== "all" || searchTerm ? ` (sur ${donations.length} total)` : ""}
                </div>
            )}
        </div>
    );
}
