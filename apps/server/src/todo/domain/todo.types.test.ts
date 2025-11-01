import { describe, expect, it } from "vitest";

import type {
	CreateTodoInput,
	TodoFilters,
	UpdateTodoInput,
} from "./todo.types";

describe("Todo Types", () => {
	describe("CreateTodoInput", () => {
		it("should have all required fields", () => {
			const input: CreateTodoInput = {
				title: "Test Todo",
				description: "Test description",
				completed: false,
				userId: "user-123",
			};

			expect(input.title).toBe("Test Todo");
			expect(input.description).toBe("Test description");
			expect(input.completed).toBe(false);
			expect(input.userId).toBe("user-123");
		});

		it("should allow null description", () => {
			const input: CreateTodoInput = {
				title: "Test Todo",
				description: null,
				completed: false,
				userId: "user-123",
			};

			expect(input.description).toBeNull();
		});
	});

	describe("UpdateTodoInput", () => {
		it("should allow partial updates", () => {
			const input: UpdateTodoInput = {
				title: "Updated Title",
			};

			expect(input.title).toBe("Updated Title");
			expect(input.description).toBeUndefined();
			expect(input.completed).toBeUndefined();
		});

		it("should allow updating all fields", () => {
			const input: UpdateTodoInput = {
				title: "Updated Title",
				description: "Updated description",
				completed: true,
			};

			expect(input.title).toBe("Updated Title");
			expect(input.description).toBe("Updated description");
			expect(input.completed).toBe(true);
		});
	});

	describe("TodoFilters", () => {
		it("should allow filtering by userId", () => {
			const filters: TodoFilters = {
				userId: "user-123",
			};

			expect(filters.userId).toBe("user-123");
			expect(filters.completed).toBeUndefined();
		});

		it("should allow filtering by completed status", () => {
			const filters: TodoFilters = {
				completed: true,
			};

			expect(filters.completed).toBe(true);
			expect(filters.userId).toBeUndefined();
		});

		it("should allow combining filters", () => {
			const filters: TodoFilters = {
				userId: "user-123",
				completed: false,
			};

			expect(filters.userId).toBe("user-123");
			expect(filters.completed).toBe(false);
		});
	});
});
