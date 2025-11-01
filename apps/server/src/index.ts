import { Elysia } from "elysia";

import { env } from "./env";
import { healthRouter } from "./routers/health";
import { StatusCodes } from "./shared/infrastructure/const";
import {
	loggerIntegration,
	openapiIntegration,
} from "./shared/infrastructure/integrations";
import { errorInterceptor } from "./shared/infrastructure/interceptors";
import { corsMiddleware } from "./shared/infrastructure/middleware";
import { auth } from "./shared/lib";
import { todoController } from "./todo/infrastructure";

const app = new Elysia()
	.use(loggerIntegration)
	.use(openapiIntegration)
	.use(errorInterceptor)
	.use(corsMiddleware)
	.all("/api/auth/*", ({ request, set }) => {
		if (["POST", "GET"].includes(request.method)) {
			return auth.handler(request);
		}

		set.status = StatusCodes.METHOD_NOT_ALLOWED;

		return { error: "Method not allowed" };
	})
	.use(healthRouter)
	.use(todoController)
	.listen(env.PORT);

export type App = typeof app;
