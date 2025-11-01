import type { Result } from "../../shared/infrastructure/utils";
import { ok } from "../../shared/infrastructure/utils";
import type { ITodoRepository, Todo, TodoFilters } from "../domain";

export type ListTodosInput = TodoFilters & {
	page?: number;
	limit?: number;
};

export type ListTodosOutput = {
	items: Todo[];
	total: number;
};

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export class ListTodosUseCase {
	constructor(private readonly todoRepository: ITodoRepository) {}

	async execute(
		input?: ListTodosInput,
	): Promise<Result<ListTodosOutput, Error>> {
		const filters: TodoFilters = {
			...input,
			page: input?.page ?? DEFAULT_PAGE,
			limit: input?.limit ?? DEFAULT_LIMIT,
		};

		const [itemsResult, totalResult] = await Promise.all([
			this.todoRepository.findAll(filters),
			this.todoRepository.count(filters),
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
