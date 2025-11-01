import { z } from "zod";

export const createTodoSchema = z.object({
	title: z.string().min(1).max(255),
	description: z.string().max(1000).optional().nullable(),
	completed: z.boolean().default(false),
	userId: z.string().min(1),
});

export const updateTodoSchema = z.object({
	title: z.string().min(1).max(255).optional(),
	description: z.string().max(1000).optional().nullable(),
	completed: z.boolean().optional(),
});

export const todoParamsSchema = z.object({
	id: z.string().min(1),
});

export const todoQuerySchema = z.object({
	userId: z.string().optional(),
	completed: z.boolean().optional(),
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(10),
});
