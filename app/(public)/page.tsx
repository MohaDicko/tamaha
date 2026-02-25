
import Link from 'next/link';
import { Hero } from '@/components/sections/Hero';
import { ImpactStats } from '@/components/sections/ImpactStats';
import { ImpactMap } from '@/components/sections/ImpactMap';
import { CTA } from '@/components/sections/CTA';
import { PartnersGrid } from '@/components/sections/PartnersGrid';
import { getPosts, Post } from '@/lib/content';
import { MediaPostCard } from '@/components/blog/MediaPostCard';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata = {
    title: 'Accueil | Tamaha - Agir pour le développement et la solidarité',
    description: 'Tamaha est une association engagée pour la santé, l\'éducation et la protection des plus vulnérables au Sénégal.',
};

export default function Home() {
    // Get latest 3 posts for the highlights
    const posts = getPosts().slice(0, 3);

    return (
        <div className="flex flex-col w-full overflow-x-hidden">
            <Hero />

            {/* Impact Highlights */}
            <ImpactStats />

            {/* Impact Map */}
            <ImpactMap />

            {/* Latest From Field Section */}
            <section className="py-24 md:py-32 bg-muted/30 relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                <Container>
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-16">
                        <div className="text-center md:text-left space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                <Sparkles size={12} /> Actualités en direct
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Le cœur de nos <span className="text-primary italic">Actions</span></h2>
                            <p className="text-muted-foreground max-w-xl text-lg font-medium">
                                Découvrez les derniers moments forts de nos interventions sur le terrain.
                                Vidéos, albums photos et témoignages exclusifs.
                            </p>
                        </div>
                        <Button size="lg" variant="outline" className="rounded-full h-14 px-8 font-black uppercase tracking-widest border-2 border-primary/20 hover:border-primary transition-all group" asChild>
                            <Link href="/blog">
                                Tout voir
                                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>

                    {/* Using a grid that works well with the complex MediaPostCard */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {posts.map((post: Post) => (
                            <div key={post.slug} className="h-full">
                                <MediaPostCard post={post} />
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-sm text-muted-foreground font-medium mb-6">Vous souhaitez contribuer à notre prochain projet ?</p>
                        <Button size="lg" className="rounded-full h-14 px-12 font-black uppercase tracking-widest bg-primary hover:scale-105 transition-transform shadow-xl shadow-primary/20" asChild>
                            <Link href="/donate">Soutenir Tamaha</Link>
                        </Button>
                    </div>
                </Container>
            </section>

            <CTA />

            <section className="py-24 border-t border-b bg-card">
                <Container>
                    <div className="text-center mb-16 space-y-2">
                        <h2 className="text-2xl font-black uppercase tracking-widest opacity-30">Ils nous accompagnent</h2>
                    </div>
                    <PartnersGrid />
                </Container>
            </section>
        </div>
    );
}
