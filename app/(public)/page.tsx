
import { Hero } from '@/components/sections/Hero';
import { Interventions } from '@/components/sections/Interventions';
import { ImpactStats } from '@/components/sections/ImpactStats';
import { ImpactMap } from '@/components/sections/ImpactMap';
import { CTA } from '@/components/sections/CTA';
import { PartnersGrid } from '@/components/sections/PartnersGrid';
import { LatestPosts } from '@/components/sections/LatestPosts';
import { getPosts } from '@/lib/content';

export const metadata = {
    title: 'Accueil | Tammaha - Agir pour le développement et la solidarité',
    description: 'Tammaha est une association engagée pour la santé, l\'éducation et la protection des plus vulnérables au Sénégal.',
};

export const revalidate = 3600; // Revalidate every 1 hour

export default async function Home() {
    // Get latest 3 posts for the highlights
    const allPosts = await getPosts();
    const posts = allPosts.slice(0, 3);

    return (
        <div className="flex flex-col w-full overflow-x-hidden bg-white">
            <Hero />

            {/* Our Interventions */}
            <Interventions />

            {/* Impact Highlights */}
            <ImpactStats />

            {/* Impact Map */}
            <ImpactMap />

            {/* Latest From Field Section */}
            <LatestPosts posts={posts} />

            <CTA />

            <PartnersGrid />
        </div>
    );
}
