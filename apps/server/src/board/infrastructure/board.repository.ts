import { and, asc, count, eq } from "drizzle-orm";

import { db } from "../../shared/infrastructure/db";
import { boards } from "../../shared/infrastructure/db/schema/board";
import { generateId, R, type Result } from "../../shared/infrastructure/utils";
import type {
	Board,
	BoardFilters,
	CreateBoardInput,
	IBoardRepository,
	UpdateBoardInput,
} from "../domain";

export default class BoardRepository implements IBoardRepository {
	async create(input: CreateBoardInput): Promise<Result<Board, Error>> {
		return R.tryAsync(async () => {
			const now = new Date();
			const [board] = await db
				.insert(boards)
				.values({
					...input,
					id: generateId(),
					createdAt: now,
					updatedAt: now,
				})
				.returning();

			if (!board) {
				throw new Error("Failed to create board");
			}

			return {
				...board,
				description: board.description ?? null,
			};
		});
	}

	async findById(id: string): Promise<Result<Board | null, Error>> {
		return R.tryAsync(async () => {
			const board = await db.query.boards.findFirst({
				where: eq(boards.id, id),
			});

			if (!board) {
				return null;
			}

			return {
				...board,
				description: board.description ?? null,
			};
		});
	}

	async findAll(filters?: BoardFilters): Promise<Result<Board[], Error>> {
		return R.tryAsync(async () => {
			const conditions = [];

			if (filters?.userId) {
				conditions.push(eq(boards.userId, filters.userId));
			}

			const page = filters?.page ?? 1;
			const limit = filters?.limit ?? 10;
			const offset = (page - 1) * limit;

			const result = await db
				.select()
				.from(boards)
				.where(conditions.length > 0 ? and(...conditions) : undefined)
				.orderBy(asc(boards.createdAt))
				.limit(limit)
				.offset(offset);

			return result.map((board) => ({
				...board,
				description: board.description ?? null,
			}));
		});
	}

	async count(filters?: BoardFilters): Promise<Result<number, Error>> {
		return R.tryAsync(async () => {
			const conditions = [];

			if (filters?.userId) {
				conditions.push(eq(boards.userId, filters.userId));
			}

			const [result] = await db
				.select({ count: count() })
				.from(boards)
				.where(conditions.length > 0 ? and(...conditions) : undefined);

			return result?.count ?? 0;
		});
	}

	async update(
		id: string,
		input: UpdateBoardInput,
	): Promise<Result<Board, Error>> {
		return R.tryAsync(async () => {
			const [board] = await db
				.update(boards)
				.set({
					...input,
					updatedAt: new Date(),
				})
				.where(eq(boards.id, id))
				.returning();

			if (!board) {
				throw new Error("Board not found");
			}

			return {
				...board,
				description: board.description ?? null,
			};
		});
	}

	async delete(id: string): Promise<Result<void, Error>> {
		return R.tryAsync(async () => {
			await db.delete(boards).where(eq(boards.id, id));
		});
	}
}
