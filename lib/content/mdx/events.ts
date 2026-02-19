
import { allEvents, type Event } from 'contentlayer/generated';
import { compareAsc, isFuture, compareDesc } from 'date-fns';

export { type Event };

export function getEvents(): Event[] {
    return allEvents.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

export function getUpcomingEvents(): Event[] {
    return allEvents
        .filter((event) => isFuture(new Date(event.date)))
        .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)));
}

export function getPastEvents(): Event[] {
    return allEvents
        .filter((event) => !isFuture(new Date(event.date)))
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

export function getEvent(slug: string): Event | undefined {
    return allEvents.find((event) => event.slug === slug);
}
