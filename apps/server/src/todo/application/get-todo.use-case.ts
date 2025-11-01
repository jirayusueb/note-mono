import type { Result } from "../../shared/infrastructure/utils";
import type { ITodoRepository, Todo } from "../domain";

export class GetTodoUseCase {
	constructor(private readonly todoRepository: ITodoRepository) {}

	async execute(id: string): Promise<Result<Todo | null, Error>> {
		return await this.todoRepository.findById(id);
	}
}
