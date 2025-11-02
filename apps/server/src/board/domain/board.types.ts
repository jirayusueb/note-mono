import type { Board } from "./board.entity";

export type CreateBoardInput = {
	name: string;
	description: string | null;
	userId: string;
};

export type UpdateBoardInput = Partial<
	Omit<Board, "id" | "userId" | "createdAt" | "updatedAt">
>;

export type BoardFilters = {
	userId?: string;
	page?: number;
	limit?: number;
};
