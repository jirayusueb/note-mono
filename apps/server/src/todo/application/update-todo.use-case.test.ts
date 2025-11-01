import { beforeEach, describe, expect, it, vi } from "vitest";

import { UpdateTodoUseCase } from "./update-todo.use-case";
import type { ITodoRepository, Todo, UpdateTodoInput } from "../domain";

describe("UpdateTodoUseCase", () => {
	let mockRepository: ITodoRepository;
	let useCase: UpdateTodoUseCase;

	beforeEach(() => {
		mockRepository = {
			create: vi.fn(),
			findById: vi.fn(),
			findAll: vi.fn(),
			update: vi.fn(),
			delete: vi.fn(),
		};

		useCase = new UpdateTodoUseCase(mockRepository);
	});

	it("should update a todo successfully", async () => {
		const todoId = "todo-123";
		const input: UpdateTodoInput = {
			title: "Updated Title",
			completed: true,
		};

		const expectedTodo: Todo = {
			id: todoId,
			title: "Updated Title",
			description: "Original description",
			completed: true,
			userId: "user-123",
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		(mockRepository.update as ReturnType<typeof vi.fn>).mockResolvedValue(
			expectedTodo,
		);

		const result = await useCase.execute(todoId, input);

		expect(mockRepository.update).toHaveBeenCalledWith(todoId, input);
		expect(result).toEqual(expectedTodo);
		expect(result.title).toBe("Updated Title");
		expect(result.completed).toBe(true);
	});

	it("should handle partial updates", async () => {
		const todoId = "todo-123";
		const input: UpdateTodoInput = {
			completed: true,
		};

		const expectedTodo: Todo = {
			id: todoId,
			title: "Original Title",
			description: null,
			completed: true,
			userId: "user-123",
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		(mockRepository.update as ReturnType<typeof vi.fn>).mockResolvedValue(
			expectedTodo,
		);

		const result = await useCase.execute(todoId, input);

		expect(result.completed).toBe(true);
		expect(result.title).toBe("Original Title");
	});
});
