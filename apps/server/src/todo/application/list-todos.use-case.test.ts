import { beforeEach, describe, expect, it, vi } from "vitest";

import { ListTodosUseCase } from "./list-todos.use-case";
import { ok } from "../../shared/infrastructure/utils";
import type { ITodoRepository, Todo, TodoFilters } from "../domain";

describe("ListTodosUseCase", () => {
	let mockRepository: ITodoRepository;
	let useCase: ListTodosUseCase;

	beforeEach(() => {
		mockRepository = {
			create: vi.fn(),
			findById: vi.fn(),
			findAll: vi.fn(),
			count: vi.fn(),
			update: vi.fn(),
			delete: vi.fn(),
		};

		useCase = new ListTodosUseCase(mockRepository);
	});

	it("should return all todos when no filters provided", async () => {
		const expectedTodos: Todo[] = [
			{
				id: "todo-1",
				title: "Todo 1",
				description: "Description 1",
				completed: false,
				userId: "user-123",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: "todo-2",
				title: "Todo 2",
				description: null,
				completed: true,
				userId: "user-123",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];

		(mockRepository.findAll as ReturnType<typeof vi.fn>).mockResolvedValue(
			ok(expectedTodos),
		);
		(mockRepository.count as ReturnType<typeof vi.fn>).mockResolvedValue(ok(2));

		const result = await useCase.execute();

		expect(result.isOk()).toBe(true);
		if (result.isOk()) {
			expect(result.value.items).toEqual(expectedTodos);
			expect(result.value.items.length).toBe(2);
			expect(result.value.total).toBe(2);
		}
	});

	it("should filter by userId", async () => {
		const filters: TodoFilters = {
			userId: "user-123",
		};

		const expectedTodos: Todo[] = [
			{
				id: "todo-1",
				title: "Todo 1",
				description: null,
				completed: false,
				userId: "user-123",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];

		(mockRepository.findAll as ReturnType<typeof vi.fn>).mockResolvedValue(
			expectedTodos,
		);

		const result = await useCase.execute(filters);

		expect(mockRepository.findAll).toHaveBeenCalledWith(filters);
		expect(result).toEqual(expectedTodos);
	});

	it("should filter by completed status", async () => {
		const filters: TodoFilters = {
			completed: true,
		};

		const expectedTodos: Todo[] = [
			{
				id: "todo-2",
				title: "Completed Todo",
				description: null,
				completed: true,
				userId: "user-123",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];

		(mockRepository.findAll as ReturnType<typeof vi.fn>).mockResolvedValue(
			expectedTodos,
		);

		const result = await useCase.execute(filters);

		expect(mockRepository.findAll).toHaveBeenCalledWith(filters);
		expect(result).toEqual(expectedTodos);
	});

	it("should return empty array when no todos found", async () => {
		(mockRepository.findAll as ReturnType<typeof vi.fn>).mockResolvedValue(
			ok([]),
		);
		(mockRepository.count as ReturnType<typeof vi.fn>).mockResolvedValue(ok(0));

		const result = await useCase.execute();

		expect(result.isOk()).toBe(true);
		if (result.isOk()) {
			expect(result.value.items).toEqual([]);
			expect(result.value.items.length).toBe(0);
			expect(result.value.total).toBe(0);
		}
	});
});
