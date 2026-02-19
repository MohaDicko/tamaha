
import { Container } from '@/components/layout/Container';

const partners = Array.from({ length: 6 }).map((_, i) => ({
    name: `Partenaire ${i + 1}`,
    logo: `https://placehold.co/200x100?text=Partenaire+${i + 1}`,
}));

export function PartnersGrid() {
    return (
        <section className="py-20 border-t">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Ils nous soutiennent</h2>
                    <p className="text-muted-foreground">Une confiance renouvelée par nos partenaires institutionnels et privés.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                    {partners.map((partner, i) => (
                        <div key={i} className="h-16 w-full relative flex items-center justify-center">
                            {/* Replaced Next/Image with img for placeholder simplicity in grid, but ideally Next/Image */}
                            <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-screen" />
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
