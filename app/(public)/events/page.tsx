
import Image from 'next/image';
import { getEvents } from '@/lib/content';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Container } from '@/components/layout/Container';
import { formatDate } from '@/lib/utils';

export const metadata = {
    title: 'Événements',
    description: 'Participez à nos événements solidaires.',
};

export default async function Events() {
    const events = await getEvents();

    return (
        <div className="bg-background min-h-screen pb-20">
            <div className="bg-primary/20 py-20 text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Événements</h1>
                <p className="mt-4 text-lg text-muted-foreground">Venez nous rencontrer et participer à nos actions.</p>
            </div>

            <Container>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event: any) => (
                        <Card key={event.slug} className="group relative overflow-hidden transition-all hover:shadow-xl">
                            <div className="relative aspect-[3/2] w-full overflow-hidden">
                                {event.cover && (
                                    <Image
                                        src={event.cover}
                                        alt={event.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                )}
                                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-md text-sm font-bold shadow-sm">
                                    {formatDate(event.date)}
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="text-xl group-hover:text-primary transition-colors">{event.title}</CardTitle>
                                <CardDescription className="flex items-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-secondary" />
                                    {event.location}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground line-clamp-3">
                                    {event.excerpt}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Container>
        </div>
    );
}
