
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/Container';

export function Hero() {
    return (
        <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden bg-background">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-secondary/20 blur-[100px]" />
            </div>

            <Container className="relative z-10 flex flex-col items-center text-center space-y-8">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    Agir pour <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">la Santé et l'Éducation</span>
                </h1>
                <p className="max-w-[800px] text-lg text-muted-foreground md:text-xl leading-relaxed">
                    Tamaha s'engage aux côtés des femmes, des jeunes et des adolescents pour la santé, l'hygiène et la lutte contre les violences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button size="lg" className="h-12 px-8 text-base" asChild>
                        <Link href="/actions">Découvrir nos actions</Link>
                    </Button>
                    <Button variant="outline" size="lg" className="h-12 px-8 text-base" asChild>
                        <Link href="/donate">Faire un don</Link>
                    </Button>
                </div>
            </Container>
        </section>
    );
}
