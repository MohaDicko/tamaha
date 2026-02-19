
import { getPost, getPosts, Post } from '@/lib/content';
import { notFound } from 'next/navigation';
import { MDXComponents } from '@/components/blog/MDXComponents';
import { PostMeta } from '@/components/blog/PostMeta';
import { Container } from '@/components/layout/Container';

interface PostPageProps {
    params: { slug: string };
}

export async function generateStaticParams() {
    const posts = getPosts();
    return posts.map((post: Post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
    const post = getPost(params.slug);
    if (!post) return;

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: ['Tamaha'],
            images: [
                {
                    url: post.cover || '/og-image.jpg',
                },
            ],
        },
    };
}

export default function PostPage({ params }: PostPageProps) {
    const post = getPost(params.slug);
    if (!post) notFound();

    return (
        <article className="min-h-screen bg-background py-20 pb-40">
            <div className="relative h-[400px] w-full mb-12 overflow-hidden bg-muted">
                <img
                    src={post.cover || "https://placehold.co/1200x600?text=Cover"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>

            <Container className="max-w-3xl relative -mt-32 z-10 bg-background/95 backdrop-blur-sm p-8 rounded-xl shadow-lg border">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">{post.title}</h1>
                <PostMeta post={post} />
                <div className="mt-12">
                    <MDXComponents code={post.body.code} />
                </div>
                <div className="mt-16 pt-8 border-t">
                    <p className="text-center font-bold text-muted-foreground italic">
                        Publié par l'équipe Tamaha le {new Date(post.date).toLocaleDateString('fr-FR')}
                    </p>
                </div>
            </Container>
        </article>
    );
}
