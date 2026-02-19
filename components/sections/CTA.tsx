
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/Container';

export function CTA() {
    return (
        <section className="py-24 bg-muted/30">
            <Container className="text-center max-w-3xl space-y-8">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                    Votre soutien fait la différence
                </h2>
                <p className="text-lg text-muted-foreground md:text-xl">
                    Chaque don compte et nous permet de réaliser nos projets solidaires.
                    Participez à notre mission dès aujourd'hui.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                    <Button size="lg" className="h-14 px-10 text-lg" asChild>
                        <Link href="/donate">Faire un don</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 px-10 text-lg bg-background" asChild>
                        <Link href="/contact">Nous contacter</Link>
                    </Button>
                </div>
            </Container>
        </section>
    );
}
