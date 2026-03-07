
"use client";

import { useState, useEffect } from 'react';
import { MediaPostCard } from './MediaPostCard';
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function MediaFeed({ posts }: { posts: any[] }) {
    const [filter, setFilter] = useState<'all' | 'article' | 'video' | 'status'>('all');
    const [visibleCount, setVisibleCount] = useState(6);

    const filteredPosts = posts.filter(post =>
        filter === 'all' ? true : post.format === filter
    );

    const displayedPosts = filteredPosts.slice(0, visibleCount);

    const handleFilterChange = (type: 'all' | 'article' | 'video' | 'status') => {
        setFilter(type);
    };

    return (
        <div className="space-y-12">
            {/* Filter Chips */}
            <div className="flex flex-wrap justify-center gap-3">
                {(['all', 'article', 'video', 'status'] as const).map((type) => (
                    <button
                        key={type}
                        onClick={() => handleFilterChange(type)}
                        className={cn(
                            "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all border-2",
                            filter === type
                                ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                                : "bg-muted/50 border-transparent text-muted-foreground hover:bg-muted hover:border-muted-foreground/20"
                        )}
                    >
                        {type === 'all' ? 'Tout' : type}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedPosts.length > 0 ? (
                    displayedPosts.map((post, i) => (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                        >
                            <MediaPostCard post={post} />
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-24 bg-muted/20 rounded-[2rem] border-2 border-dashed border-muted-foreground/20 col-span-full">
                        <div className="p-6 bg-background rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-xl">
                            <LayoutGrid className="text-muted-foreground" size={24} />
                        </div>
                        <h3 className="text-xl font-black mb-2">Pas de contenu</h3>
                        <p className="text-muted-foreground font-medium">Aucun contenu trouvé dans cette catégorie pour le moment.</p>
                    </div>
                )}
            </div>

            {displayedPosts.length < filteredPosts.length && (
                <div className="flex justify-center pt-8">
                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full px-12 h-14 font-black uppercase tracking-widest border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-xl shadow-primary/5"
                        onClick={() => setVisibleCount(prev => prev + 3)}
                    >
                        Afficher plus de publications
                    </Button>
                </div>
            )}
        </div>
    );
}
