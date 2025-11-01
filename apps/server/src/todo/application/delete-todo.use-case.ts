import type { Result } from "../../shared/infrastructure/utils";
import type { ITodoRepository } from "../domain";

export class DeleteTodoUseCase {
	constructor(private readonly todoRepository: ITodoRepository) {}

	async execute(id: string): Promise<Result<void, Error>> {
		return await this.todoRepository.delete(id);
	}
}
