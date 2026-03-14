
import Image from 'next/image';
import Link from 'next/link';
import { getProjects } from '@/lib/content';
import { Container } from '@/components/layout/Container';
import { ArrowRight, CheckCircle2, Clock, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
    title: 'Nos Actions',
    description: 'Découvrez les projets solidaires menés par Tammaha : santé, éducation et protection des vulnérables au Sénégal.',
});

export const revalidate = 3600;

const statusConfig: Record<string, { label: string; icon: any; color: string; border: string }> = {
    ongoing: { label: 'En cours', icon: Loader, color: 'bg-blue-500 text-white', border: 'hover:border-blue-300/30' },
    completed: { label: 'Terminé', icon: CheckCircle2, color: 'bg-green-500 text-white', border: 'hover:border-green-300/30' },
    planned: { label: 'À venir', icon: Clock, color: 'bg-amber-500 text-white', border: 'hover:border-amber-300/30' },
};

export default async function Actions() {
    const projects = await getProjects();

    const ongoing = projects.filter((p: any) => p.status === 'ongoing');
    const planned = projects.filter((p: any) => p.status === 'planned');
    const completed = projects.filter((p: any) => p.status === 'completed');

    const sections = [
        { title: 'En cours', items: ongoing, accent: 'text-blue-600', dot: 'bg-blue-500' },
        { title: 'À venir', items: planned, accent: 'text-amber-600', dot: 'bg-amber-500' },
        { title: 'Terminés', items: completed, accent: 'text-muted-foreground', dot: 'bg-muted-foreground' },
    ].filter(s => s.items.length > 0);

    return (
        <div className="bg-background min-h-screen pb-32">
            {/* Header */}
            <div className="relative py-24 md:py-32 overflow-hidden bg-muted/30 border-b">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-[40%] h-[100%] bg-primary/20 blur-[100px] rounded-full" />
                </div>
                <Container className="relative z-10 text-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary block mb-4">
                        Projets Terrain
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
                        Nos <span className="text-primary italic">Actions</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-medium leading-relaxed">
                        Des projets concrets menés pour un impact durable — santé, éducation et protection des plus vulnérables.
                    </p>

                    {/* Compteurs rapides */}
                    <div className="flex flex-wrap justify-center gap-8 mt-10">
                        {[
                            { label: 'En cours', value: ongoing.length, color: 'text-blue-600' },
                            { label: 'Terminés', value: completed.length, color: 'text-green-600' },
                            { label: 'À venir', value: planned.length, color: 'text-amber-600' },
                        ].map(s => (
                            <div key={s.label} className="text-center">
                                <p className={cn('text-3xl font-black', s.color)}>{s.value}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            <Container className="pt-16 space-y-20">
                {sections.map(section => (
                    <section key={section.title} className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className={cn('w-2 h-2 rounded-full', section.dot)} />
                            <h2 className={cn('text-xs font-black uppercase tracking-[0.3em]', section.accent)}>
                                {section.title} — {section.items.length} projet{section.items.length > 1 ? 's' : ''}
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {section.items.map((project: any) => (
                                <ProjectCard key={project.slug} project={project} />
                            ))}
                        </div>
                    </section>
                ))}
            </Container>
        </div>
    );
}

function ProjectCard({ project }: { project: any }) {
    const status = statusConfig[project.status] ?? statusConfig.ongoing;
    const StatusIcon = status.icon;

    return (
        <Link href={`/actions/${project.slug}`} className="group block h-full">
            <div className={cn(
                'h-full rounded-3xl overflow-hidden border-2 border-border/50 bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col',
                status.border
            )}>
                {/* Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-muted shrink-0">
                    {project.cover ? (
                        <Image
                            src={project.cover}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                            <StatusIcon size={36} className="text-primary/20" />
                        </div>
                    )}
                    {/* Badge statut */}
                    <div className="absolute top-3 right-3">
                        <span className={cn('flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md', status.color)}>
                            <StatusIcon size={11} />
                            {status.label}
                        </span>
                    </div>
                </div>

                {/* Contenu */}
                <div className="flex flex-col flex-1 p-6 space-y-4">
                    <div className="space-y-2 flex-1">
                        <h3 className="font-black text-lg tracking-tight leading-snug group-hover:text-primary transition-colors line-clamp-2">
                            {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-medium line-clamp-3">{project.excerpt}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                        <span className="text-[10px] font-bold text-muted-foreground">
                            {new Date(project.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-black uppercase tracking-widest text-primary group-hover:gap-2 transition-all">
                            Lire <ArrowRight size={13} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
