
import { getPosts, Post } from '@/lib/content';
import { PostCard } from '@/components/blog/PostCard';
import { Container } from '@/components/layout/Container';

export const metadata = {
    title: 'Blog | Tamaha',
    description: 'Les dernières actualités de l\'association.',
};

export default function Blog() {
    const posts = getPosts();

    return (
        <div className="bg-background min-h-screen pb-20">
            <div className="bg-muted py-20 text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Le Blog</h1>
                <p className="mt-4 text-lg text-muted-foreground">Toutes les nouvelles de nos projets et événements.</p>
            </div>

            <Container>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post: Post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>
            </Container>
        </div>
    );
}
