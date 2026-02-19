
import { Container } from '@/components/layout/Container';

export const metadata = {
    title: 'Confidentialité | Tamaha',
};

export default function Privacy() {
    return (
        <Container className="py-20 max-w-3xl">
            <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>
            <div className="prose dark:prose-invert">
                <p>Conformément au Règlement Général sur la Protection des Données (RGPD), nous nous engageons à protéger vos données personnelles.</p>

                <h2>Collecte des données</h2>
                <p>Les données collectées via le formulaire de contact (nom, email, message) sont utilisées uniquement pour répondre à votre demande. Elles ne sont pas partagées avec des tiers.</p>

                <h2>Cookies</h2>
                <p>Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire n'est déposé sans votre consentement.</p>

                <h2>Vos droits</h2>
                <p>Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer, contactez-nous à l'adresse dpo@tamaha.org.</p>
            </div>
        </Container>
    );
}
