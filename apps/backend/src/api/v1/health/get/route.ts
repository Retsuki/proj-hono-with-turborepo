import { createRoute, z } from "@hono/zod-openapi";
import { healthPostResponseSchema, healthPostSchema } from "./schema.js";

export const healthPostRoute = createRoute({
	tags: ["health"],
	path: "/health",
	method: "post",
	description: "Health check",
	request: {
		body: {
			content: {
				"application/json": {
					schema: healthPostSchema,
				},
			},
		},
	},
	responses: {
		200: {
			description: "Health check response",
			content: {
				"application/json": {
					schema: healthPostResponseSchema,
				},
			},
		},
		404: {
			description: "Not found",
			content: {
				"application/json": {
					schema: z.object({
						message: z.string(),
					}),
				},
			},
		},
		500: {
			description: "Internal server error",
			content: {
				"application/json": {
					schema: z.object({
						message: z.string(),
					}),
				},
			},
		},
	},
});
