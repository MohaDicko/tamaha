
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const contactSchema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    subject: z.string().min(5, "Le sujet doit être explicite"),
    message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
    honeypot: z.string().optional(), // Hidden field for anti-spam
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            if (data.honeypot) return; // Silent fail for bots

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Une erreur est survenue');
            }

            setSuccess(true);
            reset();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-green-50 text-green-800 rounded-lg animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="w-16 h-16 mb-4 text-green-600" />
                <h3 className="text-2xl font-bold mb-2">Message envoyé !</h3>
                <p className="text-center">Nous vous répondrons dans les plus brefs délais.</p>
                <Button onClick={() => setSuccess(false)} variant="outline" className="mt-6">Envoyer un autre message</Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-card p-6 sm:p-10 md:p-12 rounded-[2.5rem] shadow-2xl border-2 border-border/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -ml-12 -mb-12" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-3">
                    <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Nom complet</Label>
                    <Input id="name" {...register('name')} placeholder="Samba Dicko" className="h-14 rounded-2xl bg-muted/30 border-transparent focus:border-primary/30 font-bold" />
                    {errors.name && <p className="text-destructive text-[10px] font-black uppercase tracking-widest mt-1 ml-1">{errors.name.message}</p>}
                </div>

                <div className="space-y-3">
                    <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Email professionnel</Label>
                    <Input id="email" type="email" {...register('email')} placeholder="samba@example.com" className="h-14 rounded-2xl bg-muted/30 border-transparent focus:border-primary/30 font-bold" />
                    {errors.email && <p className="text-destructive text-[10px] font-black uppercase tracking-widest mt-1 ml-1">{errors.email.message}</p>}
                </div>
            </div>

            <div className="space-y-3 relative z-10">
                <Label htmlFor="subject" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Sujet du message</Label>
                <Input id="subject" {...register('subject')} placeholder="Comment pouvons-nous vous aider ?" className="h-14 rounded-2xl bg-muted/30 border-transparent focus:border-primary/30 font-bold" />
                {errors.subject && <p className="text-destructive text-[10px] font-black uppercase tracking-widest mt-1 ml-1">{errors.subject.message}</p>}
            </div>

            <div className="space-y-3 relative z-10">
                <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Détails de votre demande</Label>
                <Textarea id="message" {...register('message')} placeholder="Décrivez votre projet ou votre question..." className="min-h-[180px] rounded-[2rem] bg-muted/30 border-transparent focus:border-primary/30 font-medium p-6" />
                {errors.message && <p className="text-destructive text-[10px] font-black uppercase tracking-widest mt-1 ml-1">{errors.message.message}</p>}
            </div>

            {/* Honeypot field - keeping it hidden */}
            <input type="text" {...register('honeypot')} className="hidden" tabIndex={-1} autoComplete="off" />

            {error && (
                <div className="flex items-center gap-3 p-4 text-[10px] font-black uppercase tracking-widest text-destructive bg-destructive/10 rounded-2xl border border-destructive/20 relative z-10">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <Button type="submit" className="w-full h-16 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.01] transition-transform relative z-10" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Traitement en cours...
                    </>
                ) : (
                    'Envoyer mon message'
                )}
            </Button>
        </form>
    );
}
