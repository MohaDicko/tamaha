
import { getEvent, getEvents } from '@/lib/content';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { RemoteMDX } from '@/components/blog/RemoteMDX';
import { MapPin, Calendar, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface EventPageProps {
    params: { slug: string };
}

export const revalidate = 3600; // 1 heure — les événements changent rarement

export async function generateStaticParams() {
    const events = await getEvents();
    return events.map((e: any) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: EventPageProps) {
    const event = await getEvent(params.slug);
    if (!event) return {};
    return {
        title: `${event.title} | Événements Tammaha`,
        description: event.excerpt,
        openGraph: {
            title: event.title,
            description: event.excerpt,
            type: 'article',
            images: event.cover ? [{ url: event.cover }] : [],
        },
    };
}

export default async function EventPage({ params }: EventPageProps) {
    const event = await getEvent(params.slug);
    if (!event) notFound();

    const isPast = new Date(event.date) < new Date();

    return (
        <article className="min-h-screen bg-background pb-40">
            {/* Cover Hero */}
            <div className="relative h-[45vh] w-full overflow-hidden bg-muted">
                <img
                    src={event.cover || 'https://placehold.co/1200x500?text=Événement'}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                {/* Retour */}
                <div className="absolute top-6 left-6">
                    <Link
                        href="/events"
                        className="flex items-center gap-2 text-white bg-black/40 hover:bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all"
                    >
                        <ArrowLeft size={14} /> Tous les événements
                    </Link>
                </div>

                {/* Badge passé / futur */}
                <div className="absolute top-6 right-6">
                    <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-sm ${isPast ? 'bg-muted/80 text-muted-foreground' : 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'}`}>
                        {isPast ? 'Événement passé' : '● À venir'}
                    </span>
                </div>
            </div>

            <Container className="max-w-3xl relative -mt-24 z-10">
                <div className="bg-card border rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
                    {/* Header */}
                    <div className="space-y-6">
                        <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight">
                            {event.title}
                        </h1>

                        {/* Méta : date + lieu */}
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-2xl">
                                <Calendar size={15} className="text-primary" />
                                <span className="text-sm font-black">
                                    {new Date(event.date).toLocaleDateString('fr-FR', {
                                        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-2xl">
                                <MapPin size={15} className="text-primary" />
                                <span className="text-sm font-black">{event.location}</span>
                            </div>
                        </div>

                        {/* Résumé */}
                        <p className="text-lg text-muted-foreground font-medium leading-relaxed border-l-4 border-primary/30 pl-6 italic">
                            {event.excerpt}
                        </p>
                    </div>

                    {/* Contenu MDX */}
                    <div className="border-t pt-8">
                        <RemoteMDX content={event.content} />
                    </div>

                    {/* CTA si événement à venir */}
                    {!isPast && (
                        <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <p className="font-black text-sm">Vous souhaitez participer ?</p>
                                <p className="text-muted-foreground text-xs font-medium">Contactez-nous pour vous inscrire ou en savoir plus.</p>
                            </div>
                            <Link
                                href={`/contact?sujet=Inscription événement : ${encodeURIComponent(event.title)}`}
                                className="shrink-0 px-6 py-3 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                            >
                                Je m'inscris
                            </Link>
                        </div>
                    )}
                </div>
            </Container>
        </article>
    );
}
