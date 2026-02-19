
import { ContactForm } from '@/components/contact/ContactForm';
import { Container } from '@/components/layout/Container';

export const metadata = {
    title: 'Contact | Tamaha',
    description: 'Pour soutenir nos actions, devenir bénévole ou partenaire.',
};

export default function Contact() {
    return (
        <div className="bg-background min-h-screen">
            <div className="bg-muted py-20 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Contactez-nous</h1>
                <p className="mt-4 text-lg text-muted-foreground">Une question ? Une envie de s'engager ?</p>
            </div>

            <Container className="py-20 max-w-2xl">
                <div className="grid gap-8">
                    <div className="text-center space-y-4 mb-8">
                        <p className="text-lg">
                            📍 <strong>Adresse :</strong> Siège Niamana Dougoukoro<br />
                            📞 <strong>Téléphone :</strong> 85 05 02 02
                        </p>
                        <p className="text-muted-foreground">Vous pouvez utiliser le formulaire ci-dessous ou nous écrire pour toute demande.</p>
                    </div>
                    <ContactForm />
                </div>
            </Container>
        </div>
    );
}
