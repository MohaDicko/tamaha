
// Simple in-memory rate limiter for demo purposes.
// For production, use Redis or similar (e.g., Upstash).

interface RateLimitStore {
    [key: string]: number[];
}

const store: RateLimitStore = {};

export function rateLimit(ip: string, limit: number = 5, windowMs: number = 600000) {
    const now = Date.now();
    const windowStart = now - windowMs;

    if (!store[ip]) {
        store[ip] = [];
    }

    // Filter out request timestamps that are outside the current window
    store[ip] = store[ip].filter((timestamp) => timestamp > windowStart);

    const currentUsage = store[ip].length;
    const isRateLimited = currentUsage >= limit;

    // Add current request timestamp
    if (!isRateLimited) {
        store[ip].push(now);
    }

    return {
        isRateLimited,
        currentUsage,
        limit,
        remaining: Math.max(0, limit - currentUsage),
    };
}
