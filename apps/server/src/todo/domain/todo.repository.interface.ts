import type { Todo } from "./todo.entity";
import type {
	CreateTodoInput,
	TodoFilters,
	UpdateTodoInput,
} from "./todo.types";
import type { Result } from "../../shared/infrastructure/utils";

export interface ITodoRepository {
	create(input: CreateTodoInput): Promise<Result<Todo, Error>>;
	findById(id: string): Promise<Result<Todo | null, Error>>;
	findAll(filters?: TodoFilters): Promise<Result<Todo[], Error>>;
	count(filters?: TodoFilters): Promise<Result<number, Error>>;
	update(id: string, input: UpdateTodoInput): Promise<Result<Todo, Error>>;
	delete(id: string): Promise<Result<void, Error>>;
}
