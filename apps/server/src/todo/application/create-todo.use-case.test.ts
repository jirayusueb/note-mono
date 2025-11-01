import { beforeEach, describe, expect, it, vi } from "vitest";

import { CreateTodoUseCase } from "./create-todo.use-case";
import { ok } from "../../shared/infrastructure/utils";
import type { CreateTodoInput, ITodoRepository, Todo } from "../domain";

describe("CreateTodoUseCase", () => {
	let mockRepository: ITodoRepository;
	let useCase: CreateTodoUseCase;

	beforeEach(() => {
		mockRepository = {
			create: vi.fn(),
			findById: vi.fn(),
			findAll: vi.fn(),
			count: vi.fn(),
			update: vi.fn(),
			delete: vi.fn(),
		};

		useCase = new CreateTodoUseCase(mockRepository);
	});

	it("should create a todo successfully", async () => {
		const input: CreateTodoInput = {
			title: "Test Todo",
			description: "Test description",
			completed: false,
			userId: "user-123",
		};

		const expectedTodo: Todo = {
			id: "todo-123",
			...input,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		(mockRepository.create as ReturnType<typeof vi.fn>).mockResolvedValue(
			ok(expectedTodo),
		);

		const result = await useCase.execute(input);

		expect(mockRepository.create).toHaveBeenCalledWith(input);
		expect(result.isOk()).toBe(true);
		if (result.isOk()) {
			expect(result.value).toEqual(expectedTodo);
			expect(result.value.id).toBe("todo-123");
			expect(result.value.title).toBe("Test Todo");
		}
	});

	it("should handle null description", async () => {
		const input: CreateTodoInput = {
			title: "Test Todo",
			description: null,
			completed: false,
			userId: "user-123",
		};

		const expectedTodo: Todo = {
			id: "todo-123",
			...input,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		(mockRepository.create as ReturnType<typeof vi.fn>).mockResolvedValue(
			ok(expectedTodo),
		);

		const result = await useCase.execute(input);

		expect(result.isOk()).toBe(true);
		if (result.isOk()) {
			expect(result.value.description).toBeNull();
		}
	});
});
