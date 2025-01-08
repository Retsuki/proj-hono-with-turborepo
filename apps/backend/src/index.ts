//apps/backend/src/index.ts

import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { poweredBy } from "hono/powered-by";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";
import { healthPostController } from "./api/v1/health/get/controller.js";
import { healthPostRoute } from "./api/v1/health/get/route.js";

const app = new OpenAPIHono().basePath("/api/v1");

app.use(prettyJSON(), poweredBy(), logger(), requestId());

const route = app
	.openapi(healthPostRoute, healthPostController)
	.doc("/doc", {
		openapi: "3.0.0",
		info: {
			title: "API Documentation",
			version: "1.0.0",
			description: "API Documentation for the backend",
		},
	})
	.get(
		"/ui",
		swaggerUI({
			url: "/api/v1/doc",
		}),
	);

serve({
	fetch: app.fetch,
	port: 8787,
});

export type AppType = typeof route;
