import { beforeEach, describe, expect, it, vi } from "vitest";

import { GetTodoUseCase } from "./get-todo.use-case";
import type { ITodoRepository, Todo } from "../domain";

describe("GetTodoUseCase", () => {
	let mockRepository: ITodoRepository;
	let useCase: GetTodoUseCase;

	beforeEach(() => {
		mockRepository = {
			create: vi.fn(),
			findById: vi.fn(),
			findAll: vi.fn(),
			update: vi.fn(),
			delete: vi.fn(),
		};

		useCase = new GetTodoUseCase(mockRepository);
	});

	it("should return a todo when found", async () => {
		const todoId = "todo-123";
		const expectedTodo: Todo = {
			id: todoId,
			title: "Test Todo",
			description: "Test description",
			completed: false,
			userId: "user-123",
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		(mockRepository.findById as ReturnType<typeof vi.fn>).mockResolvedValue(
			expectedTodo,
		);

		const result = await useCase.execute(todoId);

		expect(mockRepository.findById).toHaveBeenCalledWith(todoId);
		expect(result).toEqual(expectedTodo);
	});

	it("should return null when todo not found", async () => {
		const todoId = "non-existent-id";

		(mockRepository.findById as ReturnType<typeof vi.fn>).mockResolvedValue(
			null,
		);

		const result = await useCase.execute(todoId);

		expect(mockRepository.findById).toHaveBeenCalledWith(todoId);
		expect(result).toBeNull();
	});
});
