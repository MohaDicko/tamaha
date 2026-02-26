
import { z } from 'zod';

const envSchema = z.object({
    RESEND_API_KEY: z.string().optional(),
    CONTACT_TO_EMAIL: z.string().email().optional(),
    NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
    DATABASE_URL: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    ADMIN_USER: z.string().default('admin'),
    ADMIN_PASSWORD: z.string().default('admin'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error("❌ Invalid environment variables:", _env.error.format());
    throw new Error("Invalid environment variables");
}

export const env = _env.data;

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envSchema> { }
    }
}
