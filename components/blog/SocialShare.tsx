
"use client";

import { Share2, Link as LinkIcon, Facebook, MessageCircle, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface SocialShareProps {
    url: string;
    title: string;
}

export function SocialShare({ url, title }: SocialShareProps) {
    const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;

    const shareLinks = [
        {
            name: 'Facebook',
            icon: Facebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
            color: 'text-blue-600'
        },
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${fullUrl}`)}`,
            color: 'text-green-500'
        },
        {
            name: 'Twitter', // or X
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
            color: 'text-sky-500'
        }
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(fullUrl);
        toast.success("Lien copié dans le presse-papier !");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:text-primary gap-2 h-9">
                    <Share2 size={18} />
                    <span className="text-xs font-bold hidden sm:inline">Partager</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                {shareLinks.map((link) => (
                    <DropdownMenuItem key={link.name} asChild>
                        <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 cursor-pointer py-2.5"
                        >
                            <link.icon size={18} className={link.color} />
                            <span className="font-semibold text-sm">{link.name}</span>
                        </a>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuItem onClick={copyToClipboard} className="flex items-center gap-3 cursor-pointer py-2.5">
                    <LinkIcon size={18} className="text-muted-foreground" />
                    <span className="font-semibold text-sm">Copier le lien</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
