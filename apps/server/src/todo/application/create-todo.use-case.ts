import type { Result } from "../../shared/infrastructure/utils";
import type { CreateTodoInput, ITodoRepository, Todo } from "../domain";

export class CreateTodoUseCase {
	constructor(private readonly todoRepository: ITodoRepository) {}

	async execute(input: CreateTodoInput): Promise<Result<Todo, Error>> {
		return await this.todoRepository.create(input);
	}
}
