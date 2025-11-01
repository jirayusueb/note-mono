import { and, asc, count, eq } from "drizzle-orm";

import { db } from "../../shared/infrastructure/db";
import { todos } from "../../shared/infrastructure/db/schema/todo";
import { generateId, R, type Result } from "../../shared/infrastructure/utils";
import type {
	CreateTodoInput,
	ITodoRepository,
	Todo,
	TodoFilters,
	UpdateTodoInput,
} from "../domain";

export default class TodoRepository implements ITodoRepository {
	async create(input: CreateTodoInput): Promise<Result<Todo, Error>> {
		return R.tryAsync(async () => {
			const now = new Date();
			const [todo] = await db
				.insert(todos)
				.values({
					...input,
					id: generateId(),
					createdAt: now,
					updatedAt: now,
				})
				.returning();

			if (!todo) {
				throw new Error("Failed to create todo");
			}

			return {
				...todo,
				description: todo.description ?? null,
			};
		});
	}

	async findById(id: string): Promise<Result<Todo | null, Error>> {
		return R.tryAsync(async () => {
			const todo = await db.query.todos.findFirst({
				where: eq(todos.id, id),
			});

			if (!todo) {
				return null;
			}

			return {
				...todo,
				description: todo.description ?? null,
			};
		});
	}

	async findAll(filters?: TodoFilters): Promise<Result<Todo[], Error>> {
		return R.tryAsync(async () => {
			const conditions = [];

			if (filters?.userId) {
				conditions.push(eq(todos.userId, filters.userId));
			}

			if (filters?.completed !== undefined) {
				conditions.push(eq(todos.completed, filters.completed));
			}

			const page = filters?.page ?? 1;
			const limit = filters?.limit ?? 10;
			const offset = (page - 1) * limit;

			const result = await db
				.select()
				.from(todos)
				.where(conditions.length > 0 ? and(...conditions) : undefined)
				.orderBy(asc(todos.createdAt))
				.limit(limit)
				.offset(offset);

			return result.map((todo) => ({
				...todo,
				description: todo.description ?? null,
			}));
		});
	}

	async count(filters?: TodoFilters): Promise<Result<number, Error>> {
		return R.tryAsync(async () => {
			const conditions = [];

			if (filters?.userId) {
				conditions.push(eq(todos.userId, filters.userId));
			}

			if (filters?.completed !== undefined) {
				conditions.push(eq(todos.completed, filters.completed));
			}

			const [result] = await db
				.select({ count: count() })
				.from(todos)
				.where(conditions.length > 0 ? and(...conditions) : undefined);

			return result?.count ?? 0;
		});
	}

	async update(
		id: string,
		input: UpdateTodoInput,
	): Promise<Result<Todo, Error>> {
		return R.tryAsync(async () => {
			const [todo] = await db
				.update(todos)
				.set({
					...input,
					updatedAt: new Date(),
				})
				.where(eq(todos.id, id))
				.returning();

			if (!todo) {
				throw new Error("Todo not found");
			}

			return {
				...todo,
				description: todo.description ?? null,
			};
		});
	}

	async delete(id: string): Promise<Result<void, Error>> {
		return R.tryAsync(async () => {
			await db.delete(todos).where(eq(todos.id, id));
		});
	}
}
