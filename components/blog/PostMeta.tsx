
import { formatDate } from '@/lib/utils';
import { Post } from '@/lib/content/mdx';

export function PostMeta({ post }: { post: Post }) {
    return (
        <div className="flex gap-4 items-center text-sm text-muted-foreground mt-4">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>•</span>
            <span>{post.readingTime}</span>
            {post.tags && (
                <>
                    <span>•</span>
                    <div className="flex gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="bg-muted px-2 py-1 rounded-full text-xs font-medium text-foreground">
                                {tag}
                            </span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
