
import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';

const components = {
    Image,
};

interface MDXComponentsProps {
    code: string;
}

export function MDXComponents({ code }: MDXComponentsProps) {
    const Component = useMDXComponent(code);
    return <div className="prose dark:prose-invert max-w-none"><Component components={components} /></div>;
}
