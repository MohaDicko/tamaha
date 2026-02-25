
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Post } from '@/lib/content/mdx';
import { formatDate } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Play, MessageSquare, Heart, Bookmark, MoreHorizontal, Share2, Sparkles } from 'lucide-react';
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
            className="w-full max-w-2xl mx-auto mb-8 h-full"
        >
            <Card className="h-full overflow-hidden border border-slate-100 bg-white group transition-all duration-300 hover:shadow-xl flex flex-col rounded-[2rem]">
                {/* Header (Author Info) */}
                <CardHeader className="p-5 flex flex-row items-center justify-between space-y-0 relative z-10">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-slate-100 group-hover:border-primary transition-all duration-500">
                            <AvatarImage src={post.authorAvatar} />
                            <AvatarFallback className="bg-slate-50 text-slate-400 font-bold">
                                {post.author?.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-bold leading-none text-slate-900">{post.author}</p>
                            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">
                                {formatDate(post.date)}
                            </p>
                        </div>
                    </div>
                </CardHeader>

                {/* Media Section */}
                <div className="relative aspect-[16/10] overflow-hidden mx-5 rounded-2xl border border-slate-50">
                    {isVideo ? (
                        <div className="w-full h-full relative bg-slate-100 group/media">
                            {post.cover && (
                                <Image
                                    src={post.cover}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                                >
                                    <Play fill="currentColor" size={24} className="ml-1" />
                                </motion.div>
                            </div>
                            <div className="absolute top-3 left-3">
                                <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest border border-slate-100">Vidéo</span>
                            </div>
                        </div>
                    ) : isGallery ? (
                        <div className="grid grid-cols-2 gap-0.5 w-full h-full relative group/media bg-slate-50">
                            {post.images?.slice(0, 4).map((img, idx) => (
                                <div key={idx} className="relative w-full h-full overflow-hidden">
                                    <Image
                                        src={img}
                                        alt={`Gallery ${idx}`}
                                        fill
                                        className="object-cover group-hover/media:scale-110 transition-transform duration-[1s]"
                                    />
                                    {idx === 3 && post.images && post.images.length > 4 && (
                                        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
                                            <span className="text-white text-xl font-bold">+{post.images.length - 4}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="absolute top-3 left-3">
                                <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest border border-slate-100">Photos</span>
                            </div>
                        </div>
                    ) : (
                        <Link href={post.url} className="block w-full h-full overflow-hidden relative group/media">
                            {post.cover && (
                                <Image
                                    src={post.cover}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover/media:scale-110"
                                />
                            )}
                            <div className="absolute top-3 left-3">
                                <span className="bg-primary text-white text-[9px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-md">Article</span>
                            </div>
                        </Link>
                    )}
                </div>

                {/* Content */}
                <CardContent className="p-6 pb-2 flex-1 flex flex-col">
                    <div className="space-y-3 flex-1">
                        <Link href={post.url}>
                            <h3 className="text-xl font-black leading-tight tracking-tight text-slate-900 group-hover:text-primary transition-colors">
                                {post.title}
                            </h3>
                        </Link>
                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 font-medium">
                            {post.excerpt}
                        </p>
                    </div>

                    <div className="flex gap-2 flex-wrap pt-4">
                        {post.tags?.map(tag => (
                            <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline cursor-pointer">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </CardContent>

                {/* Interaction Footer */}
                <CardFooter className="p-3 px-6 flex items-center justify-between border-t border-slate-50">
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "gap-2 h-9 px-3 rounded-lg transition-all",
                                isLiked ? "text-primary bg-primary/5" : "text-slate-400 hover:text-primary"
                            )}
                            onClick={handleLike}
                        >
                            <Heart size={16} className={cn(isLiked && "fill-current")} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">
                                {likesCount}
                            </span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-primary gap-2 h-9 px-3 rounded-lg" asChild>
                            <Link href={post.url}>
                                <MessageSquare size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Commenter</span>
                            </Link>
                        </Button>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "rounded-lg h-9 w-9 transition-all",
                            isBookmarked ? "text-primary bg-primary/5" : "text-slate-400 hover:text-primary"
                        )}
                        onClick={() => setIsBookmarked(!isBookmarked)}
                    >
                        <Bookmark size={16} className={cn(isBookmarked && "fill-current")} />
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
