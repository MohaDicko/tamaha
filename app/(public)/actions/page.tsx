
import Image from 'next/image';
import { getProjects, Project } from '@/lib/content';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Container } from '@/components/layout/Container';
import { cn, formatDate } from '@/lib/utils'; // Keep formatDate if desired, though projects usually span time.

export const metadata = {
    title: 'Nos Actions',
    description: 'Découvrez les projets solidaires menés par Tamaha.',
};

const statusMap: Record<string, { label: string; color: string }> = {
    ongoing: { label: 'En cours', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
    completed: { label: 'Terminé', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
    planned: { label: 'À venir', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
};

export default function Actions() {
    const projects = getProjects();

    return (
        <div className="bg-background min-h-screen pb-20">
            <div className="bg-secondary/30 py-20 text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Nos Actions</h1>
                <p className="mt-4 text-lg text-muted-foreground">Des projets concrets pour un impact durable.</p>
            </div>

            <Container>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project: Project) => (
                        <Card key={project.slug} className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1">
                            <div className="relative aspect-video w-full bg-muted">
                                {project.cover && (
                                    <Image
                                        src={project.cover}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                                <div className="absolute top-2 right-2">
                                    {project.status && (
                                        <span className={cn("px-2 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm", statusMap[project.status]?.color)}>
                                            {statusMap[project.status]?.label}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                                <CardDescription>{formatDate(project.date)}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="prose prose-sm dark:prose-invert line-clamp-4 text-muted-foreground">
                                    {/* Render simplified content or excerpt */}
                                    {project.excerpt}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Container>
        </div>
    );
}
