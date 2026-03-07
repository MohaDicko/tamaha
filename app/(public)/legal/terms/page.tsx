
import { Container } from '@/components/layout/Container';

export const metadata = {
    title: 'Mentions Légales | Tammaha',
};

export default function Terms() {
    return (
        <Container className="py-20 max-w-3xl">
            <h1 className="text-3xl font-bold mb-8">Mentions Légales</h1>

            <div className="space-y-4">
                <div>
                    <h2 className="text-xl font-bold">Éditeur</h2>
                    <p>Association TAMMAHA</p>
                    <p>Numéro RNA : W123456789</p>
                    <p>Siège social : 12 rue de la République, 75001 Paris, France</p>
                    <p>Contact : contact@tammaha.org</p>
                </div>

                <div>
                    <h2 className="text-xl font-bold">Hébergeur</h2>
                    <p>Vercel Inc.</p>
                    <p>340 S Lemon Ave #4133 Walnut, CA 91789, USA</p>
                </div>

                <div>
                    <h2 className="text-xl font-bold">Propriété intellectuelle</h2>
                    <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.</p>
                </div>
            </div>
        </Container>
    );
}
