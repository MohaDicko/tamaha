
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Post } from '@/lib/content/mdx';
import { formatDate } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Play, MessageSquare, Heart, Bookmark, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SocialShare } from './SocialShare';
import { cn } from '@/lib/utils';

export function MediaPostCard({ post }: { post: Post }) {
    const isVideo = post.format === 'video';
    const isGallery = post.format === 'gallery';

    // Seeded random for consistent fake counts
    const getSeed = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash);
    };

    const seed = getSeed(post.slug);
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState((seed % 50) + 5);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-2xl mx-auto mb-8"
        >
            <Card className="overflow-hidden border-none shadow-xl bg-card group">
                {/* Header (Author Info) */}
                <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-primary/10 group-hover:border-primary/30 transition-colors">
                            <AvatarImage src={post.authorAvatar} />
                            <AvatarFallback className="bg-primary/5 text-primary font-bold">
                                {post.author?.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-bold leading-none">{post.author}</p>
                            <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-medium">
                                {formatDate(post.date)}
                            </p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full">
                        <MoreHorizontal size={18} />
                    </Button>
                </CardHeader>

                {/* Media Section */}
                <div className="relative overflow-hidden">
                    {isVideo ? (
                        <div className="aspect-video relative bg-black group/media">
                            {post.cover && (
                                <Image
                                    src={post.cover}
                                    alt={post.title}
                                    fill
                                    className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-16 h-16 bg-primary/95 rounded-full flex items-center justify-center text-white shadow-2xl"
                                >
                                    <Play fill="white" size={32} className="ml-1" />
                                </motion.div>
                            </div>
                            <div className="absolute bottom-4 left-4">
                                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/10">Vidéo</span>
                            </div>
                        </div>
                    ) : isGallery ? (
                        <div className="grid grid-cols-2 gap-0.5 aspect-[4/3] relative group/media overflow-hidden">
                            {post.images?.slice(0, 4).map((img, idx) => (
                                <div key={idx} className="relative w-full h-full overflow-hidden">
                                    <Image
                                        src={img}
                                        alt={`Gallery ${idx}`}
                                        fill
                                        className="object-cover group-hover/media:scale-110 transition-transform duration-700"
                                    />
                                    {idx === 3 && post.images && post.images.length > 4 && (
                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                                            <span className="text-white text-3xl font-black">+{post.images.length - 4}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="absolute bottom-4 left-4">
                                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/10">Album Photo</span>
                            </div>
                        </div>
                    ) : (
                        <Link href={post.url} className="block overflow-hidden aspect-[16/10] relative group/media">
                            {post.cover && (
                                <Image
                                    src={post.cover}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover/media:scale-110"
                                />
                            )}
                            <div className="absolute bottom-4 left-4">
                                <span className="bg-primary/95 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg border border-white/10">Article</span>
                            </div>
                        </Link>
                    )}
                </div>

                {/* Content */}
                <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                        <Link href={post.url}>
                            <h3 className="text-xl font-black leading-tight tracking-tight hover:text-primary transition-colors decoration-primary underline-offset-4 decoration-2">
                                {post.title}
                            </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                            {post.excerpt}
                        </p>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        {post.tags?.map(tag => (
                            <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 px-2 py-0.5 rounded cursor-pointer transition-colors">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Interaction Stats */}
                    <div className="flex items-center justify-between pt-2 border-t text-[11px] text-muted-foreground font-bold uppercase tracking-wider">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5">
                                <div className="flex -space-x-1">
                                    <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center ring-2 ring-card">
                                        <Heart size={8} fill="white" className="text-white" />
                                    </div>
                                    <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center ring-2 ring-card">
                                        <Play size={8} fill="white" className="text-white ml-0.5" />
                                    </div>
                                </div>
                                {likesCount} Réactions
                            </span>
                            <span className="hover:underline cursor-pointer">{Math.floor(likesCount / 3)} Commentaires</span>
                        </div>
                        <span className="hover:underline cursor-pointer">{Math.floor(likesCount / 5)} Partages</span>
                    </div>
                </CardContent>

                {/* Interaction Footer */}
                <CardFooter className="p-1 px-4 flex items-center justify-between border-t bg-muted/5">
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "gap-2 h-10 px-4 rounded-none transition-all",
                                isLiked ? "text-red-500 hover:text-red-600 bg-red-50" : "hover:text-primary"
                            )}
                            onClick={handleLike}
                        >
                            <Heart size={20} className={cn(isLiked && "fill-current")} />
                            <span className="text-xs font-black uppercase tracking-widest flex items-center">
                                {isLiked ? "J'aime" : "J'aime"}
                            </span>
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:text-primary gap-2 h-10 px-4 rounded-none" asChild>
                            <Link href={post.url}>
                                <MessageSquare size={20} />
                                <span className="text-xs font-black uppercase tracking-widest">Commenter</span>
                            </Link>
                        </Button>
                        <SocialShare url={post.url} title={post.title} />
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "rounded-full h-9 w-9",
                            isBookmarked ? "text-primary" : "text-muted-foreground"
                        )}
                        onClick={() => setIsBookmarked(!isBookmarked)}
                    >
                        <Bookmark size={20} className={cn(isBookmarked && "fill-current")} />
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
