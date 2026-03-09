"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
];

export function LanguageSwitcher() {
    const [currentLang, setCurrentLang] = useState(languages[0]);

    useEffect(() => {
        // Hide standard Google Translator Widget Elements via CSS dynamically to avoid SSR mismatch
        const style = document.createElement("style");
        style.innerHTML = `
      body { top: 0 !important; }
      .VIpgJd-ZVi9od-ORHb-OEVmcd { display: none !important; }
      .VIpgJd-ZVi9od-aZ2wEe-wOHMyf { display: none !important; }
      .goog-te-banner-frame { display: none !important; }
      .skiptranslate { display: none !important; }
      #goog-gt-tt { display: none !important; }
      .goog-tooltip { display: none !important; }
      .goog-tooltip:hover { display: none !important; }
      .goog-text-highlight { background-color: transparent !important; border: none !important; box-shadow: none !important; }
    `;
        document.head.appendChild(style);

        // Initialize Google Translate
        (window as any).googleTranslateElementInit = () => {
            new (window as any).google.translate.TranslateElement(
                { pageLanguage: "fr", includedLanguages: "fr,en,ar", autoDisplay: false },
                "google_translate_element"
            );
        };

        if (!document.querySelector('script[src*="translate_a/element.js"]')) {
            const script = document.createElement("script");
            script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        }

        // Checking cookies for current active language
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(";").shift();
        };

        const googTransCookie = getCookie("googtrans");
        if (googTransCookie) {
            const langCode = googTransCookie.split("/").pop();
            const found = languages.find((l) => l.code === langCode);
            if (found) setCurrentLang(found);
        } else {
            // By default French
            setCurrentLang(languages[0]);
        }
    }, []);

    const changeLanguage = (langCode: string) => {
        const isDomain = window.location.hostname;
        const cookieString = `/fr/${langCode}`;

        // Set cookie for site domain
        document.cookie = `googtrans=${cookieString}; path=/`;
        document.cookie = `googtrans=${cookieString}; path=/; domain=${isDomain}`;
        // Fallback if localhost
        if (isDomain === "localhost") {
            document.cookie = `googtrans=${cookieString}; path=/; domain=localhost`;
        }

        window.location.reload();
    };

    return (
        <div className="flex items-center notranslate">
            {/* Container required by Google Translate (Hidden) */}
            <div id="google_translate_element" className="hidden"></div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-[38px] h-[38px] rounded-full border border-slate-200 bg-white/90 shadow-sm text-slate-700 hover:text-primary hover:bg-primary/5 transition-all font-medium"
                        title="Changer de langue"
                    >
                        <Globe className="h-[18px] w-[18px]" />
                        <span className="sr-only">Changer la langue</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[140px] rounded-xl border border-slate-100 shadow-xl p-1 z-[110]">
                    {languages.map((lang) => (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2 text-[13px] font-medium transition-colors outline-none focus:bg-slate-100 ${currentLang.code === lang.code
                                    ? "bg-primary/10 text-primary"
                                    : "text-slate-600 hover:text-slate-900"
                                }`}
                        >
                            <span className="text-[16px] leading-none drop-shadow-sm">{lang.flag}</span>
                            {lang.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
