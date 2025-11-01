import type { Result } from "../../shared/infrastructure/utils";
import type { ITodoRepository, Todo, UpdateTodoInput } from "../domain";

export class UpdateTodoUseCase {
	constructor(private readonly todoRepository: ITodoRepository) {}

	async execute(
		id: string,
		input: UpdateTodoInput,
	): Promise<Result<Todo, Error>> {
		return await this.todoRepository.update(id, input);
	}
}
