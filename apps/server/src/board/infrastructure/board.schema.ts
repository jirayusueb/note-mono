import { z } from "zod";

export const createBoardSchema = z.object({
	name: z.string().min(1).max(255),
	description: z.string().max(1000).optional().nullable(),
});

export const updateBoardSchema = z.object({
	name: z.string().min(1).max(255).optional(),
	description: z.string().max(1000).optional().nullable(),
});

export const boardParamsSchema = z.object({
	id: z.string().min(1),
});

export const boardQuerySchema = z.object({
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(10),
});
