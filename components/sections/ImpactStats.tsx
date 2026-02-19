
import { Container } from '@/components/layout/Container';

export function ImpactStats() {
    const stats = [
        { label: "Bénéficiaires", value: "2500+" },
        { label: "Projets réalisés", value: "42" },
        { label: "Partenaires", value: "15" },
        { label: "Années d'action", value: "5" },
    ];

    return (
        <section className="py-20 bg-primary text-primary-foreground">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, i) => (
                        <div key={i} className="space-y-2">
                            <div className="text-4xl md:text-5xl font-extrabold tracking-tight">
                                {stat.value}
                            </div>
                            <p className="text-primary-foreground/80 font-medium uppercase tracking-widest text-sm">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
