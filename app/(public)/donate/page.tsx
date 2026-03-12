
import { Container } from '@/components/layout/Container';
import { DonationForm } from '@/components/sections/DonationForm';
import { Heart } from 'lucide-react';

export const metadata = {
    title: 'Faire un don | Tammaha',
};

export default function Donate() {
    return (
        <div className="bg-background min-h-screen relative">
            {/* Hero Section with abstract design */}
            <div className="relative pt-32 pb-40 md:pt-40 md:pb-56 bg-[#006633] overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-white blur-[100px]" />
                    <div className="absolute top-[60%] -right-[10%] w-[50%] h-[50%] rounded-full bg-secondary blur-[120px]" />
                </div>

                <Container className="relative z-10 text-center text-primary-foreground max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">
                        <Heart size={14} className="text-red-400 fill-red-400" />
                        Changer des vies ensemble
                    </div>
                    <h1 className="text-4xl font-black tracking-tight sm:text-7xl mb-6">
                        Soutenez <br /> notre mission
                    </h1>
                    <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed font-medium">
                        Votre générosité nous permet d'agir concrètement sur le terrain pour la santé,
                        l'éducation et la protection des plus vulnérables.
                    </p>
                </Container>
            </div>

            {/* Donation Form Section */}
            <div className="relative -mt-24 md:-mt-40 pb-24 px-4 z-20">
                <Container>
                    <div className="bg-card rounded-[3rem] shadow-premium overflow-hidden border border-border">
                        <DonationForm />
                    </div>
                </Container>
            </div>

            {/* Info Section */}
            <Container className="pb-24 max-w-4xl">
                <div className="grid md:grid-cols-2 gap-12 items-center text-center md:text-left">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black tracking-tight">Votre impact en chiffres</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">1</div>
                                <p className="text-muted-foreground"><strong>2500+</strong> bénéficiaires directs de nos actions sanitaires chaque année.</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">2</div>
                                <p className="text-muted-foreground"><strong>15</strong> écoles et centres de santé soutenus durablement dans la région.</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">3</div>
                                <p className="text-muted-foreground"><strong>80%</strong> de vos dons vont directement aux actions de terrain.</p>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-muted/50 p-10 rounded-3xl border border-dashed border-primary/30">
                        <h3 className="text-xl font-bold mb-4">Réduction fiscale</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            L'association Tammaha est reconnue d'intérêt général. Vos dons ouvrent droit à une réduction d'impôt sur le revenu égale à 66% de leur montant.
                        </p>
                        <div className="p-4 bg-background rounded-2xl flex items-center gap-4 border shadow-sm">
                            <div className="text-2xl font-black text-primary">66%</div>
                            <div className="text-[10px] uppercase font-black text-muted-foreground leading-tight tracking-widest">
                                De déduction <br /> fiscale
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
