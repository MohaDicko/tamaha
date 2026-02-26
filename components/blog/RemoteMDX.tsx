
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';

const components = {
    img: (props: any) => (
        <Image
            {...props}
            width={800}
            height={400}
            className="rounded-xl"
            alt={props.alt || ''}
        />
    ),
    // Add other components as needed
};

export function RemoteMDX({ content }: { content: string }) {
    return (
        <div className="prose dark:prose-invert max-w-none">
            <MDXRemote source={content} components={components} />
        </div>
    );
}
