
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Post } from '@/lib/content/mdx';
import { formatDate } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export function PostCard({ post }: { post: Post }) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="h-full"
        >
            <Card className="flex flex-col overflow-hidden h-full border-none shadow-md hover:shadow-xl transition-all duration-300 bg-card group">
                <Link href={post.url} className="block overflow-hidden relative aspect-[16/10]">
                    {post.cover ? (
                        <Image
                            src={post.cover}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                            <span className="text-muted-foreground">Pas d'image</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                <CardHeader className="p-6 pb-2">
                    <div className="flex gap-2 mb-3 flex-wrap">
                        {post.tags?.map(tag => (
                            <span key={tag} className="text-[10px] uppercase tracking-wider bg-primary/10 text-primary px-2.5 py-1 rounded-md font-bold">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <Link href={post.url}>
                        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                        </h3>
                    </Link>
                </CardHeader>

                <CardContent className="px-6 py-2 flex-1">
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                        {post.excerpt}
                    </p>
                </CardContent>

                <CardFooter className="px-6 pb-6 pt-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                        {formatDate(post.date)}
                    </span>
                    <Link href={post.url} className="flex items-center gap-1 text-sm font-bold text-primary group/link">
                        Lire l'article
                        <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
