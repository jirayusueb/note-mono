import { describe, expect, it } from "vitest";

import type { Todo } from "./todo.entity";

describe("Todo Entity", () => {
	it("should have all required properties", () => {
		const todo: Todo = {
			id: "test-id",
			title: "Test Todo",
			description: "Test description",
			completed: false,
			userId: "user-123",
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		expect(todo).toHaveProperty("id");
		expect(todo).toHaveProperty("title");
		expect(todo).toHaveProperty("description");
		expect(todo).toHaveProperty("completed");
		expect(todo).toHaveProperty("userId");
		expect(todo).toHaveProperty("createdAt");
		expect(todo).toHaveProperty("updatedAt");
	});

	it("should allow null description", () => {
		const todo: Todo = {
			id: "test-id",
			title: "Test Todo",
			description: null,
			completed: false,
			userId: "user-123",
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		expect(todo.description).toBeNull();
	});

	it("should have Date types for timestamps", () => {
		const todo: Todo = {
			id: "test-id",
			title: "Test Todo",
			description: null,
			completed: false,
			userId: "user-123",
			createdAt: new Date("2024-01-01"),
			updatedAt: new Date("2024-01-02"),
		};

		expect(todo.createdAt).toBeInstanceOf(Date);
		expect(todo.updatedAt).toBeInstanceOf(Date);
	});
});
