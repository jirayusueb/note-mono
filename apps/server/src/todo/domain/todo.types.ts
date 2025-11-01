import type { Todo } from "./todo.entity";

export type CreateTodoInput = {
	title: string;
	description: string | null;
	completed: boolean;
	userId: string;
};

export type UpdateTodoInput = Partial<
	Omit<Todo, "id" | "userId" | "createdAt" | "updatedAt">
>;

export type TodoFilters = {
	userId?: string;
	completed?: boolean;
	page?: number;
	limit?: number;
};
