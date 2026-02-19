
import { Metadata } from 'next';
import { env } from './env';

export const siteConfig = {
    title: 'Tamaha Association',
    description: 'Tamaha est une association dédiée au développement, à la solidarité et à l\'éducation.',
    url: env.NEXT_PUBLIC_SITE_URL,
    twitter: '@tamaha_asso',
};

export function constructMetadata({
    title = siteConfig.title,
    description = siteConfig.description,
    image = '/og-image.jpg',
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    noIndex?: boolean;
} = {}): Metadata {
    return {
        title: {
            default: title,
            template: `%s | ${siteConfig.title}`,
        },
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                },
            ],
            url: env.NEXT_PUBLIC_SITE_URL,
            siteName: siteConfig.title,
            locale: 'fr_FR',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
            creator: siteConfig.twitter,
        },
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
        metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
    };
}
