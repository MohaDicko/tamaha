
import { getPosts } from '@/lib/content';
import { MediaFeed } from '@/components/blog/MediaFeed';
import { Container } from '@/components/layout/Container';

export const metadata = {
    title: 'Actualités | Tamaha',
    description: 'Suivez nos actions, nos vidéos et nos albums photos sur le terrain.',
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Blog() {
    const posts = await getPosts();

    return (
        <div className="bg-background min-h-screen pb-32">
            {/* Premium Header */}
            <div className="relative py-24 md:py-32 overflow-hidden bg-muted/30 border-b">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-primary/20 blur-[120px] rounded-full" />
                </div>

                <Container className="relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
                        Notre <span className="text-primary italic">Flux</span> d'Actions
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
                        Vidéos, photos et articles : plongez au cœur de nos projets au Sénégal et découvrez l'impact de vos dons.
                    </p>
                </Container>
            </div>

            <Container className="pt-12">
                <MediaFeed posts={posts} />
            </Container>
        </div>
    );
}
