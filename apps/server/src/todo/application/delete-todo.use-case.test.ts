import { beforeEach, describe, expect, it, vi } from "vitest";

import { DeleteTodoUseCase } from "./delete-todo.use-case";
import type { ITodoRepository } from "../domain";

describe("DeleteTodoUseCase", () => {
	let mockRepository: ITodoRepository;
	let useCase: DeleteTodoUseCase;

	beforeEach(() => {
		mockRepository = {
			create: vi.fn(),
			findById: vi.fn(),
			findAll: vi.fn(),
			update: vi.fn(),
			delete: vi.fn(),
		};

		useCase = new DeleteTodoUseCase(mockRepository);
	});

	it("should delete a todo successfully", async () => {
		const todoId = "todo-123";

		(mockRepository.delete as ReturnType<typeof vi.fn>).mockResolvedValue(
			undefined,
		);

		await useCase.execute(todoId);

		expect(mockRepository.delete).toHaveBeenCalledWith(todoId);
		expect(mockRepository.delete).toHaveBeenCalledTimes(1);
	});
});
