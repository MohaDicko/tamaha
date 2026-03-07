
import { getProject, getProjects } from '@/lib/content';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { RemoteMDX } from '@/components/blog/RemoteMDX';
import { ArrowLeft, Calendar, CheckCircle2, Clock, Loader } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ActionPageProps {
    params: { slug: string };
}

export const revalidate = 3600;

export async function generateStaticParams() {
    const projects = await getProjects();
    return projects.map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ActionPageProps) {
    const project = await getProject(params.slug);
    if (!project) return {};
    return {
        title: `${project.title} | Actions Tammaha`,
        description: project.excerpt,
        openGraph: {
            title: project.title,
            description: project.excerpt,
            type: 'article',
            images: project.cover ? [{ url: project.cover }] : [],
        },
    };
}

const statusConfig: Record<string, { label: string; icon: any; color: string; bg: string }> = {
    ongoing: { label: 'En cours', icon: Loader, color: 'text-blue-600', bg: 'bg-blue-500/10 border-blue-500/20' },
    completed: { label: 'Terminé', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-500/10 border-green-500/20' },
    planned: { label: 'À venir', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-500/10 border-amber-500/20' },
};

export default async function ActionPage({ params }: ActionPageProps) {
    const project = await getProject(params.slug);
    if (!project || !project.published) notFound();

    const status = statusConfig[project.status] ?? statusConfig.ongoing;
    const StatusIcon = status.icon;

    return (
        <article className="min-h-screen bg-background pb-40">
            {/* Cover Hero */}
            <div className="relative h-[45vh] w-full overflow-hidden bg-muted">
                <img
                    src={project.cover || 'https://placehold.co/1200x500?text=Action+Tammaha'}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                {/* Retour */}
                <div className="absolute top-6 left-6">
                    <Link
                        href="/actions"
                        className="flex items-center gap-2 text-white bg-black/40 hover:bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all"
                    >
                        <ArrowLeft size={14} /> Toutes les actions
                    </Link>
                </div>

                {/* Badge statut */}
                <div className="absolute top-6 right-6">
                    <span className={cn('flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-sm border', status.bg, status.color)}>
                        <StatusIcon size={13} />
                        {status.label}
                    </span>
                </div>
            </div>

            <Container className="max-w-3xl relative -mt-24 z-10">
                <div className="bg-card border rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
                    {/* Header */}
                    <div className="space-y-5">
                        <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight">
                            {project.title}
                        </h1>

                        {/* Date de lancement */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-2xl w-fit">
                            <Calendar size={15} className="text-primary" />
                            <span className="text-sm font-black">
                                Lancé le {new Date(project.date).toLocaleDateString('fr-FR', {
                                    day: 'numeric', month: 'long', year: 'numeric'
                                })}
                            </span>
                        </div>

                        {/* Résumé */}
                        <p className="text-lg text-muted-foreground font-medium leading-relaxed border-l-4 border-primary/30 pl-6 italic">
                            {project.excerpt}
                        </p>
                    </div>

                    {/* Contenu MDX */}
                    <div className="border-t pt-8">
                        <RemoteMDX content={project.content} />
                    </div>

                    {/* CTA Don */}
                    <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="font-black text-sm">Soutenir cette action</p>
                            <p className="text-muted-foreground text-xs font-medium">Votre don contribue directement à ce projet sur le terrain.</p>
                        </div>
                        <Link
                            href="/donate"
                            className="shrink-0 px-6 py-3 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                        >
                            Faire un don ❤️
                        </Link>
                    </div>
                </div>
            </Container>
        </article>
    );
}
