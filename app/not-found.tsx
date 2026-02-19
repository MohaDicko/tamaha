
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/Container';

export default function NotFound() {
    return (
        <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-primary">404</h2>
            <h1 className="text-2xl font-bold">Page introuvable</h1>
            <p className="text-muted-foreground max-w-md">
                Désolé, la page que vous recherchez semble avoir été déplacée ou n'existe plus.
            </p>
            <Button size="lg" asChild>
                <Link href="/">Retourner à l'accueil</Link>
            </Button>
        </Container>
    );
}
