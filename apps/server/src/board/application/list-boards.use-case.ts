import type { Result } from "../../shared/infrastructure/utils";
import { ok } from "../../shared/infrastructure/utils";
import type { Board, BoardFilters, IBoardRepository } from "../domain";

export type ListBoardsInput = BoardFilters & {
	page?: number;
	limit?: number;
};

export type ListBoardsOutput = {
	items: Board[];
	total: number;
};

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export class ListBoardsUseCase {
	constructor(private readonly boardRepository: IBoardRepository) {}

	async execute(
		input?: ListBoardsInput,
	): Promise<Result<ListBoardsOutput, Error>> {
		const filters: BoardFilters = {
			...input,
			page: input?.page ?? DEFAULT_PAGE,
			limit: input?.limit ?? DEFAULT_LIMIT,
		};

		const [itemsResult, totalResult] = await Promise.all([
			this.boardRepository.findAll(filters),
			this.boardRepository.count(filters),
		]);

		if (itemsResult.isErr()) {
			return itemsResult;
		}

		if (totalResult.isErr()) {
			return totalResult;
		}

		return ok({
			items: itemsResult.value,
			total: totalResult.value,
		});
	}
}
