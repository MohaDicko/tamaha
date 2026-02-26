"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { MediaPostCard } from "@/components/blog/MediaPostCard";

export function LatestPosts({ posts }: { posts: any[] }) {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 mb-20">
                    <div className="text-center md:text-left space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-500"
                        >
                            <Sparkles size={12} className="text-primary" /> Actualités
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-slate-900 leading-none">
                            Le Cœur De <br />
                            <span className="text-primary italic">Nos Actions</span>
                        </h2>
                    </div>
                    <Button variant="link" className="text-primary font-bold uppercase tracking-widest group" asChild>
                        <Link href="/blog">
                            Tout le Journal
                            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {posts.map((post: any) => (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="h-full"
                        >
                            <MediaPostCard post={post} />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center p-12 rounded-[2.5rem] bg-slate-50 border border-slate-100 relative overflow-hidden">
                    <p className="text-slate-600 font-medium mb-8 italic">"Chaque geste compte pour bâtir un monde plus juste."</p>
                    <Button size="lg" className="rounded-full h-14 px-10 text-xs font-bold uppercase tracking-widest bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20" asChild>
                        <Link href="/donate">Soutenir Notre Mission</Link>
                    </Button>
                </div>
            </Container>
        </section>
    );
}
