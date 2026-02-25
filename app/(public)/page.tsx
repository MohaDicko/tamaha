
import { Hero } from '@/components/sections/Hero';
import { ImpactStats } from '@/components/sections/ImpactStats';
import { ImpactMap } from '@/components/sections/ImpactMap';
import { CTA } from '@/components/sections/CTA';
import { PartnersGrid } from '@/components/sections/PartnersGrid';
import { LatestPosts } from '@/components/sections/LatestPosts';
import { getPosts } from '@/lib/content';

export const metadata = {
    title: 'Accueil | Tamaha - Agir pour le développement et la solidarité',
    description: 'Tamaha est une association engagée pour la santé, l\'éducation et la protection des plus vulnérables au Sénégal.',
};

export default function Home() {
    // Get latest 3 posts for the highlights
    const posts = getPosts().slice(0, 3);

    return (
        <div className="flex flex-col w-full overflow-x-hidden bg-[#050505]">
            <Hero />

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
