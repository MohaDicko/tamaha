
import Image from 'next/image';
import Link from 'next/link';
import { getEvents } from '@/lib/content';
import { Container } from '@/components/layout/Container';
import { MapPin, Calendar, ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export const metadata = {
    title: 'Événements | Tammaha — Agir pour le développement et la solidarité',
    description: 'Participez à nos événements solidaires et venez nous rencontrer sur le terrain.',
};

export const revalidate = 3600;

export default async function Events() {
    const events = await getEvents();
    const now = new Date();

    const upcoming = events.filter((e: any) => new Date(e.date) >= now)
        .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const past = events.filter((e: any) => new Date(e.date) < now)
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="bg-background min-h-screen pb-32">
            {/* Header */}
            <div className="relative py-24 md:py-32 overflow-hidden bg-muted/30 border-b">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-primary/20 blur-[120px] rounded-full" />
                </div>
                <Container className="relative z-10 text-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary block mb-4">
                        Agenda Tammaha
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
                        Nos <span className="text-primary italic">Événements</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-medium leading-relaxed">
                        Venez nous rencontrer, participez à nos collectes, conférences et actions de terrain.
                    </p>
                </Container>
            </div>

            <Container className="pt-16 space-y-20">
                {/* Événements à venir */}
                {upcoming.length > 0 && (
                    <section className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary">
                                À venir — {upcoming.length} événement{upcoming.length > 1 ? 's' : ''}
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {upcoming.map((event: any) => (
                                <EventCard key={event.slug} event={event} isPast={false} />
                            ))}
                        </div>
                    </section>
                )}

                {upcoming.length === 0 && (
                    <div className="text-center py-16 text-muted-foreground">
                        <Clock size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="font-medium">Aucun événement à venir pour le moment.</p>
                        <p className="text-sm mt-2">Revenez bientôt ou suivez-nous sur les réseaux sociaux.</p>
                    </div>
                )}

                {/* Événements passés */}
                {past.length > 0 && (
                    <section className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">
                                Passés — {past.length} événement{past.length > 1 ? 's' : ''}
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-70 hover:opacity-100 transition-opacity duration-500">
                            {past.map((event: any) => (
                                <EventCard key={event.slug} event={event} isPast={true} />
                            ))}
                        </div>
                    </section>
                )}
            </Container>
        </div>
    );
}

function EventCard({ event, isPast }: { event: any; isPast: boolean }) {
    return (
        <Link href={`/events/${event.slug}`} className="group block">
            <div className={cn(
                'rounded-3xl overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
                isPast ? 'border-border/50' : 'border-border/50 hover:border-primary/30 hover:shadow-primary/5'
            )}>
                {/* Couverture */}
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted">
                    {event.cover ? (
                        <Image
                            src={event.cover}
                            alt={event.title}
                            fill
                            className={cn(
                                'object-cover transition-transform duration-500 group-hover:scale-105',
                                isPast && 'grayscale opacity-70'
                            )}
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                            <Calendar size={40} className="text-primary/30" />
                        </div>
                    )}
                    {/* Badge statut */}
                    <div className="absolute top-3 left-3">
                        <span className={cn(
                            'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest',
                            isPast
                                ? 'bg-black/50 text-white/70 backdrop-blur-sm'
                                : 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                        )}>
                            {isPast ? 'Passé' : '● À venir'}
                        </span>
                    </div>
                </div>

                {/* Contenu */}
                <div className="p-6 bg-card space-y-4">
                    <h3 className="font-black text-lg tracking-tight leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {event.title}
                    </h3>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                            <Calendar size={12} className="text-primary" />
                            {new Date(event.date).toLocaleDateString('fr-FR', {
                                weekday: 'short', day: 'numeric', month: 'long', year: 'numeric'
                            })}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                            <MapPin size={12} className="text-primary" />
                            {event.location}
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground font-medium line-clamp-2">{event.excerpt}</p>

                    <div className="flex items-center gap-1 text-xs font-black uppercase tracking-widest text-primary group-hover:gap-2 transition-all">
                        Voir les détails <ArrowRight size={13} />
                    </div>
                </div>
            </div>
        </Link>
    );
}
