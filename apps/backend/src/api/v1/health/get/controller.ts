import type { RouteHandler } from "@hono/zod-openapi";
import type { healthPostRoute } from "./route.js";

export const healthPostController: RouteHandler<typeof healthPostRoute> = (
	c,
) => {
	const { title, body } = c.req.valid("json");
	return c.json({
		ok: true,
		message: `${title} ${body}`,
	});
};
