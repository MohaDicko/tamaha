
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t bg-muted/40 py-12">
            <div className="container grid gap-8 md:grid-cols-4">
                <div>
                    <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
                        <img src="/logo.jpg" alt="Logo Tamaha" className="h-8 w-8 rounded-full object-cover" />
                        <span>TAMAHA</span>
                    </Link>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                        Tamaha est une association dédiée au développement, à la solidarité et à l'éducation.
                    </p>
                    <div className="mt-4 text-sm text-muted-foreground space-y-1">
                        <p>📍 Siège : Niamana Dougoukoro</p>
                        <p>📞 Tél : 85 05 02 02</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Navigation</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/about" className="hover:underline">L'Association</Link></li>
                        <li><Link href="/actions" className="hover:underline">Nos Actions</Link></li>
                        <li><Link href="/events" className="hover:underline">Événements</Link></li>
                        <li><Link href="/blog" className="hover:underline">Actualités</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Participation</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/donate" className="hover:underline">Faire un don</Link></li>
                        <li><Link href="/partners" className="hover:underline">Partenaires</Link></li>
                        <li><Link href="/contact" className="hover:underline">Nous contacter</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Légal</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/legal/terms" className="hover:underline">Mentions légales</Link></li>
                        <li><Link href="/legal/privacy" className="hover:underline">Confidentialité</Link></li>
                    </ul>
                </div>
            </div>
            <div className="container mt-8 pt-8 border-t text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} Tamaha. Tous droits réservés.
            </div>
        </footer>
    );
}
