
import Link from 'next/link';
import { Hero } from '@/components/sections/Hero';
import { ImpactStats } from '@/components/sections/ImpactStats';
import { CTA } from '@/components/sections/CTA';
import { PartnersGrid } from '@/components/sections/PartnersGrid';
import { getPosts, Post } from '@/lib/content';
import { PostCard } from '@/components/blog/PostCard';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';

export const metadata = {
    title: 'Accueil | Tamaha',
};

export default function Home() {
    const posts = getPosts().slice(0, 3);

    return (
        <>
            <Hero />
            <ImpactStats />

            <section className="py-20 bg-muted/50">
                <Container>
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Dernières actualités</h2>
                            <p className="text-muted-foreground mt-2">Suivez nos actions sur le terrain.</p>
                        </div>
                        <Button variant="ghost" asChild>
                            <Link href="/blog">Voir tout &rarr;</Link>
                        </Button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {posts.map((post: Post) => (
                            <PostCard key={post.slug} post={post} />
                        ))}
                    </div>
                </Container>
            </section>

            <CTA />
            <PartnersGrid />
        </>
    );
}
