
"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Container } from '@/components/layout/Container';

export function ImpactStats() {
    const stats = [
        { label: "Bénéficiaires", value: 2500, suffix: "+", color: "bg-blue-500" },
        { label: "Actions Santé", value: 120, suffix: "", color: "bg-green-500" },
        { label: "Forages Eaux", value: 15, suffix: "", color: "bg-sky-500" },
        { label: "Années d'Exp.", value: 5, suffix: "", color: "bg-orange-500" },
    ];

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-32 relative overflow-hidden bg-background">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale">
                <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(45deg,_var(--primary)_0,_var(--primary)_1px,_transparent_0,_transparent_50%)] bg-[length:20px_20px]" />
            </div>

            <Container className="relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] blur-2xl group-hover:bg-primary/10 transition-colors" />
                            <div className="relative p-6 md:p-10 bg-card border-2 border-border/50 rounded-[2.5rem] flex flex-col items-center text-center gap-4 hover:border-primary/20 transition-all hover:translate-y-[-8px]">
                                <div className={cn("w-2 h-2 rounded-full animate-pulse mb-2", stat.color)} />
                                <div className="text-4xl md:text-6xl font-black tracking-tighter italic">
                                    <Counter value={stat.value} isInView={isInView} />
                                    <span className="text-primary">{stat.suffix}</span>
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground leading-tight">
                                    {stat.label}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

function Counter({ value, isInView }: { value: number; isInView: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const end = value;
        const duration = 2000;
        const startTime = performance.now();

        const updateCount = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
                const progress = elapsedTime / duration;
                // Ease out expo
                const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                setCount(Math.floor(easedProgress * end));
                requestAnimationFrame(updateCount);
            } else {
                setCount(end);
            }
        };

        const raf = requestAnimationFrame(updateCount);
        return () => cancelAnimationFrame(raf);
    }, [isInView, value]);

    return <span>{count.toLocaleString()}</span>;
}

import { cn } from '@/lib/utils';
