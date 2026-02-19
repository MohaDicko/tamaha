
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/content/mdx';
import { formatDate } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function PostCard({ post }: { post: Post }) {
    return (
        <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow h-full">
            {post.cover && (
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                    />
                </div>
            )}
            <CardHeader>
                <div className="flex gap-2 mb-2 flex-wrap">
                    {post.tags?.map(tag => (
                        <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">{tag}</span>
                    ))}
                </div>
                <Link href={post.url} className="text-xl font-bold hover:underline line-clamp-2">
                    {post.title}
                </Link>
                <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-muted-foreground line-clamp-3">
                    {post.excerpt}
                </p>
            </CardContent>
        </Card>
    );
}
