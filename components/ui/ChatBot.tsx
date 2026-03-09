"use client";

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
// @ts-ignore
import Markdown from 'markdown-to-jsx';
import { AnimatePresence, motion } from 'framer-motion';

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
        api: '/api/chat',
        initialMessages: [
            {
                id: 'welcome-msg',
                role: 'assistant',
                content: "Bonjour ! 👋 Je suis l'assistant de Tammaha. Comment puis-je vous aider aujourd'hui ?"
            }
        ]
    });

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-24 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-colors"
                >
                    <Bot size={28} />
                </motion.button>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-6 right-6 z-[100] flex h-[550px] max-h-[85vh] w-[350px] sm:w-[400px] max-w-[90vw] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-3 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">Assistant Tammaha</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </span>
                                        <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">En ligne</p>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full text-muted-foreground hover:bg-muted"
                                onClick={() => setIsOpen(false)}
                            >
                                <X size={18} />
                            </Button>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
                        >
                            {messages.map((message: any) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={message.id}
                                    className={cn(
                                        "flex flex-col max-w-[85%]",
                                        message.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                                    )}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-medium uppercase text-muted-foreground">
                                            {message.role === 'user' ? 'Vous' : 'Assistant'}
                                        </span>
                                    </div>
                                    <div
                                        className={cn(
                                            "rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                                            message.role === 'user'
                                                ? "bg-primary text-primary-foreground rounded-tr-sm"
                                                : "bg-muted text-foreground border rounded-tl-sm prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:p-2 prose-pre:rounded-lg"
                                        )}
                                    >
                                        <Markdown>{message.content}</Markdown>
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-start gap-1"
                                >
                                    <span className="text-[10px] font-medium uppercase text-muted-foreground ml-1">Assistant</span>
                                    <div className="rounded-2xl px-4 py-3 text-sm bg-muted text-muted-foreground border rounded-tl-sm flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                        <span className="animate-pulse">Réflexion en cours...</span>
                                    </div>
                                </motion.div>
                            )}

                            {error && (
                                <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive text-center mt-2 flex flex-col items-center gap-1">
                                    <X className="h-5 w-5" />
                                    <span>Désolé, une erreur de connexion est survenue. L'IA ne parvient pas à répondre actuellement.</span>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="border-t bg-background p-3">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (!input.trim()) return;
                                    handleSubmit(e);
                                }}
                                className="flex items-center gap-2 relative bg-muted/40 p-1 pl-3 rounded-full border focus-within:ring-1 focus-within:ring-primary/50 transition-all shadow-sm"
                            >
                                <Input
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Posez-moi une question..."
                                    className="flex-1 border-0 bg-transparent px-0 py-2 h-9 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground text-sm"
                                    disabled={isLoading}
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className={cn(
                                        "h-8 w-8 rounded-full shrink-0 transition-all",
                                        input.trim() ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted"
                                    )}
                                    disabled={isLoading || !input.trim()}
                                >
                                    <Send size={14} className={cn("-ml-0.5", isLoading && "opacity-50")} />
                                </Button>
                            </form>
                            <div className="text-center mt-2">
                                <p className="text-[10px] text-muted-foreground/60">
                                    IA Propulsée par <span className="font-medium text-foreground/70">Google Gemini</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
