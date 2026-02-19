
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
    title: 'Faire un don | Tamaha',
};

export default function Donate() {
    return (
        <div className="bg-background min-h-screen">
            <div className="bg-primary py-24 text-center text-primary-foreground">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">Soutenez Tamaha</h1>
                <p className="mt-4 text-xl opacity-90">Votre générosité change des vies.</p>
            </div>

            <Container className="py-20 max-w-4xl space-y-12">
                <div className="prose dark:prose-invert max-w-none text-center">
                    <p className="text-2xl font-medium">Pourquoi donner ?</p>
                    <p>
                        Chaque euro collecté est investi directement dans nos projets éducatifs et sanitaires.
                        Nous sommes une association reconnue d'intérêt général ouvrant droit à réduction fiscale.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="border p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-3xl font-bold text-primary mb-2">20€</div>
                        <p className="text-muted-foreground">Finance un kit scolaire complet pour un enfant.</p>
                        <Button className="mt-6 w-full" variant="outline">Donner 20€</Button>
                    </div>
                    <div className="border p-8 rounded-xl text-center shadow-md border-primary bg-primary/5 scale-105">
                        <div className="text-3xl font-bold text-primary mb-2">50€</div>
                        <p className="text-muted-foreground">Assure les repas d'une famille pendant une semaine.</p>
                        <Button className="mt-6 w-full">Donner 50€</Button>
                    </div>
                    <div className="border p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-3xl font-bold text-primary mb-2">100€</div>
                        <p className="text-muted-foreground">Participe à la rénovation d'une salle de classe.</p>
                        <Button className="mt-6 w-full" variant="outline">Donner 100€</Button>
                    </div>
                </div>

                <div className="bg-muted p-8 rounded-xl text-center">
                    <h3 className="text-xl font-bold mb-4">Virement Bancaire</h3>
                    <p className="mb-4">Vous pouvez également effectuer un virement sur notre compte :</p>
                    <pre className="bg-background p-4 rounded text-sm overflow-x-auto inline-block text-left">
                        IBAN : FR76 1234 5678 9012 3456 7890 123
                        BIC : XXXXXXXX
                        Titulaire : Association TAMAHA
                    </pre>
                    <p className="mt-4 text-sm text-muted-foreground">N'oubliez pas d'indiquer votre nom en libellé.</p>
                </div>

                <div className="text-center">
                    <p className="mb-4">Pour toute question relative aux dons :</p>
                    <Button variant="link" asChild><Link href="/contact">Nous contacter</Link></Button>
                </div>
            </Container>
        </div>
    );
}
