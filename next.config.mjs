
import { withContentlayer } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    images: {
        domains: ['images.unsplash.com', 'placehold.co'],
    },
};

export default withContentlayer(nextConfig);
