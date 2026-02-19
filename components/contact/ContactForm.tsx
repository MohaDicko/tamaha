
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card p-8 rounded-xl shadow-sm border">
            <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" {...register('name')} placeholder="Votre nom" />
                {errors.name && <p className="text-destructive text-sm font-medium">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email')} placeholder="votre@email.com" />
                {errors.email && <p className="text-destructive text-sm font-medium">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input id="subject" {...register('subject')} placeholder="Objet de votre demande" />
                {errors.subject && <p className="text-destructive text-sm font-medium">{errors.subject.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" {...register('message')} placeholder="Votre message..." className="min-h-[150px]" />
                {errors.message && <p className="text-destructive text-sm font-medium">{errors.message.message}</p>}
            </div>

            {/* Honeypot field - keeping it hidden */}
            <input type="text" {...register('honeypot')} className="hidden" tabIndex={-1} autoComplete="off" />

            {error && (
                <div className="flex items-center gap-2 p-4 text-sm text-destructive bg-destructive/10 rounded-md">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Envoi en cours...
                    </>
                ) : (
                    'Envoyer le message'
                )}
            </Button>
        </form>
    );
}
