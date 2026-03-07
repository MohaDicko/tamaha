
import { PartnersGrid } from '@/components/sections/PartnersGrid';
import { Container } from '@/components/layout/Container';

export const metadata = {
    title: 'Nos Partenaires | Tammaha',
};

export default function Partners() {
    return (
        <div className="bg-background min-h-screen pb-20">
            <div className="bg-secondary/30 py-20 text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Partenaires</h1>
                <p className="mt-4 text-lg text-muted-foreground">Ils rendent possible nos actions.</p>
            </div>
            <PartnersGrid />
            <Container className="text-center mt-12">
                <p className="text-lg">Vous souhaitez devenir partenaire ?</p>
                <a href="/contact" className="text-primary font-bold hover:underline">Contactez-nous</a>
            </Container>
        </div>
    );
}
