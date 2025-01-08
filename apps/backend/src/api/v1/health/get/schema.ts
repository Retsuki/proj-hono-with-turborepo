// apps/backend/src/api/v1/health/get/schema.ts

import { z } from "@hono/zod-openapi";

export const healthPostSchema = z.object({
	title: z.string(),
	body: z.string(),
});

export const healthPostResponseSchema = z.object({
	ok: z.boolean(),
	message: z.string(),
});

export type HealthPostSchema = z.infer<typeof healthPostSchema>;
export type HealthPostResponseSchema = z.infer<typeof healthPostResponseSchema>;
