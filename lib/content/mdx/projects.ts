
import { allProjects, type Project } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

export { type Project };

export function getProjects(): Project[] {
    return allProjects.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

export function getProject(slug: string): Project | undefined {
    return allProjects.find((project) => project.slug === slug);
}

export function getProjectStatuses(): string[] {
    const statuses = new Set<string>();
    allProjects.forEach((project) => statuses.add(project.status || 'ongoing'));
    return Array.from(statuses);
}
