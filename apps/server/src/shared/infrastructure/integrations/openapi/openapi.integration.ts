import { openapi } from "@elysiajs/openapi";
import { fromTypes } from "@elysiajs/openapi/gen";
import z from "zod";

const databaseIntegration = openapi({
	references: fromTypes(),
	mapJsonSchema: {
		zod: z.toJSONSchema,
	},
});

export default databaseIntegration;
