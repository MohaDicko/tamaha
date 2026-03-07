
import { Container } from '@/components/layout/Container';

export const metadata = {
    title: 'À propos',
    description: 'Découvrez l\'histoire et les valeurs de l\'association Tammaha.',
};

export default function About() {
    return (
        <div className="bg-background">
            <div className="bg-muted py-20 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Notre Histoire</h1>
                <p className="mt-4 text-lg text-muted-foreground">Une aventure humaine au service des autres.</p>
            </div>
            <Container className="py-20 max-w-4xl space-y-12">
                <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
                    <p>
                        Fondée avec une vision de solidarité et d'entraide, l'association <strong>Tammaha</strong> œuvre au quotidien pour améliorer les conditions de vie des populations vulnérables.
                    </p>
                    <p>
                        Basée à <strong>Niamana Dougoukoro</strong>, nous intervenons principalement auprès des <strong>femmes, des jeunes et des adolescents</strong>.
                    </p>
                    <p>
                        Nos actions s'articulent autour de plusieurs axes majeurs :
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li><strong>Santé publique :</strong> Sensibilisation et information sur diverses maladies, et organisation de campagnes de dépistage.</li>
                        <li><strong>Prévention :</strong> Séances de causeries sur les Violences Basées sur le Genre (VBG) et les dangers des psychotropes.</li>
                        <li><strong>Hygiène :</strong> Promotion de l'hygiène corporelle et intime.</li>
                        <li><strong>Soutien :</strong> Accompagnement psychologique pour les personnes en détresse.</li>
                    </ul>

                    <h2 className="text-3xl font-bold mt-12 mb-6">Nos Valeurs</h2>
                    <div className="grid md:grid-cols-3 gap-8 not-prose">
                        <div className="p-6 border rounded-lg bg-card shadow-sm">
                            <h3 className="text-xl font-semibold mb-2">Solidarité</h3>
                            <p className="text-muted-foreground text-sm">Nous croyons en la force du collectif pour surmonter les épreuves.</p>
                        </div>
                        <div className="p-6 border rounded-lg bg-card shadow-sm">
                            <h3 className="text-xl font-semibold mb-2">Transparence</h3>
                            <p className="text-muted-foreground text-sm">Chaque don est tracé et chaque action est documentée.</p>
                        </div>
                        <div className="p-6 border rounded-lg bg-card shadow-sm">
                            <h3 className="text-xl font-semibold mb-2">Respect</h3>
                            <p className="text-muted-foreground text-sm">Nous agissons dans le respect des cultures et des traditions locales.</p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold mt-12 mb-6">Notre Équipe</h2>
                    <p>
                        Tammaha, c'est avant tout une trentaine de bénévoles passionnés qui donnent de leur temps et de leur énergie pour faire vivre nos projets.
                    </p>
                </div>
            </Container>
        </div>
    );
}
