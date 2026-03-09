
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Play, MessageSquare, Heart, Bookmark, X, ChevronLeft, ChevronRight, Maximize2, Share2, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SocialShare } from './SocialShare';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export function MediaPostCard({ post }: { post: any }) {
    const postUrl = `/blog/${post.slug}`;
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
    const [imgSrc, setImgSrc] = useState(post.cover || `https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop`);

    // Carousel & Lightbox State
    const [activeIdx, setActiveIdx] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const images = post.images || [];

    const handleImgError = () => {
        setImgSrc(`https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop`);
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setActiveIdx((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
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
                                {post.author?.split(' ').map((n: string) => n[0]).join('') || '?'}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-bold leading-none text-slate-900">{post.author || 'Anonyme'}</p>
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
                            {imgSrc && (
                                <Image
                                    src={imgSrc}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    onError={handleImgError}
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
                    ) : isGallery && images.length > 0 ? (
                        <div className="w-full h-full relative group/media bg-slate-50 cursor-pointer overflow-hidden" onClick={() => setIsLightboxOpen(true)}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIdx}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="relative w-full h-full"
                                >
                                    <Image
                                        src={images[activeIdx]}
                                        alt={`Gallery ${activeIdx}`}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Carousel Controls */}
                            {images.length > 1 && (
                                <>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover/media:opacity-100 transition-opacity z-20"
                                        onClick={prevImage}
                                    >
                                        <ChevronLeft size={20} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover/media:opacity-100 transition-opacity z-20"
                                        onClick={nextImage}
                                    >
                                        <ChevronRight size={20} />
                                    </Button>

                                    {/* Indicators */}
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-20">
                                        {images.map((_: any, idx: number) => (
                                            <div
                                                key={idx}
                                                className={cn(
                                                    "h-1 rounded-full transition-all duration-300",
                                                    idx === activeIdx ? "w-4 bg-white" : "w-1.5 bg-white/40"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}

                            <div className="absolute top-3 left-3 z-20">
                                <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest border border-slate-100 flex items-center gap-1.5 shadow-sm">
                                    <Sparkles size={10} className="text-primary" />
                                    {images.length} Photos
                                </span>
                            </div>
                        </div>
                    ) : (
                        <Link href={postUrl} className="block w-full h-full overflow-hidden relative group/media">
                            {imgSrc && (
                                <Image
                                    src={imgSrc}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover/media:scale-110"
                                    onError={handleImgError}
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
                        <Link href={postUrl}>
                            <h3 className="text-xl font-black leading-tight tracking-tight text-slate-900 group-hover:text-primary transition-colors">
                                {post.title}
                            </h3>
                        </Link>
                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 font-medium">
                            {post.excerpt}
                        </p>
                    </div>

                    <div className="flex gap-2 flex-wrap pt-4">
                        {post.tags?.map((tag: string) => (
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
                            <Link href={postUrl}>
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

            {/* Lightbox / Modal View */}
            <AnimatePresence>
                {isLightboxOpen && images.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 rounded-full h-12 w-12"
                            onClick={() => setIsLightboxOpen(false)}
                        >
                            <X size={28} />
                        </Button>

                        <div className="relative w-full max-w-5xl aspect-square sm:aspect-video" onClick={(e) => e.stopPropagation()}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`modal-${activeIdx}`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="w-full h-full relative"
                                >
                                    <Image
                                        src={images[activeIdx]}
                                        alt={`Lightbox ${activeIdx}`}
                                        fill
                                        className="object-contain"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Nav Controls Inside Lightbox */}
                            {images.length > 1 && (
                                <>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute -left-4 sm:left-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full text-white hover:bg-white/10"
                                        onClick={prevImage}
                                    >
                                        <ChevronLeft size={44} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute -right-4 sm:right-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full text-white hover:bg-white/10"
                                        onClick={nextImage}
                                    >
                                        <ChevronRight size={44} />
                                    </Button>

                                    {/* Page Info */}
                                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium tracking-widest uppercase">
                                        {activeIdx + 1} / {images.length}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Thumbnails at the bottom */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto pb-2 scrollbar-none" onClick={(e) => e.stopPropagation()}>
                            {images.map((img: string, idx: number) => (
                                <button
                                    key={`thumb-${idx}`}
                                    onClick={() => setActiveIdx(idx)}
                                    className={cn(
                                        "relative h-16 w-16 sm:h-20 sm:w-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all",
                                        idx === activeIdx ? "border-primary opacity-100 scale-110" : "border-transparent opacity-40 hover:opacity-60"
                                    )}
                                >
                                    <Image src={img} alt="thumb" fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
