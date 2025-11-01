import { describe, expect, it } from "vitest";

import {
	createTodoSchema,
	todoParamsSchema,
	todoQuerySchema,
	updateTodoSchema,
} from "./todo.schema";

describe("Todo Schemas", () => {
	describe("createTodoSchema", () => {
		it("should validate valid todo input", () => {
			const input = {
				title: "Test Todo",
				description: "Test description",
				completed: false,
				userId: "user-123",
			};

			const result = createTodoSchema.safeParse(input);

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.title).toBe("Test Todo");
				expect(result.data.description).toBe("Test description");
				expect(result.data.completed).toBe(false);
				expect(result.data.userId).toBe("user-123");
			}
		});

		it("should allow null description", () => {
			const input = {
				title: "Test Todo",
				description: null,
				completed: false,
				userId: "user-123",
			};

			const result = createTodoSchema.safeParse(input);

			expect(result.success).toBe(true);
		});

		it("should reject empty title", () => {
			const input = {
				title: "",
				description: "Test description",
				completed: false,
				userId: "user-123",
			};

			const result = createTodoSchema.safeParse(input);

			expect(result.success).toBe(false);
		});

		it("should reject missing title", () => {
			const input = {
				description: "Test description",
				completed: false,
				userId: "user-123",
			};

			const result = createTodoSchema.safeParse(input);

			expect(result.success).toBe(false);
		});

		it("should reject missing userId", () => {
			const input = {
				title: "Test Todo",
				description: "Test description",
				completed: false,
			};

			const result = createTodoSchema.safeParse(input);

			expect(result.success).toBe(false);
		});

		it("should default completed to false", () => {
			const input = {
				title: "Test Todo",
				userId: "user-123",
			};

			const result = createTodoSchema.safeParse(input);

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.completed).toBe(false);
			}
		});
	});

	describe("updateTodoSchema", () => {
		it("should validate partial update", () => {
			const input = {
				title: "Updated Title",
			};

			const result = updateTodoSchema.safeParse(input);

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.title).toBe("Updated Title");
			}
		});

		it("should allow updating all fields", () => {
			const input = {
				title: "Updated Title",
				description: "Updated description",
				completed: true,
			};

			const result = updateTodoSchema.safeParse(input);

			expect(result.success).toBe(true);
		});

		it("should allow empty object", () => {
			const input = {};

			const result = updateTodoSchema.safeParse(input);

			expect(result.success).toBe(true);
		});
	});

	describe("todoParamsSchema", () => {
		it("should validate valid id", () => {
			const input = {
				id: "todo-123",
			};

			const result = todoParamsSchema.safeParse(input);

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.id).toBe("todo-123");
			}
		});

		it("should reject empty id", () => {
			const input = {
				id: "",
			};

			const result = todoParamsSchema.safeParse(input);

			expect(result.success).toBe(false);
		});
	});

	describe("todoQuerySchema", () => {
		it("should validate query with userId", () => {
			const input = {
				userId: "user-123",
			};

			const result = todoQuerySchema.safeParse(input);

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.userId).toBe("user-123");
			}
		});

		it("should validate query with completed", () => {
			const input = {
				completed: true,
			};

			const result = todoQuerySchema.safeParse(input);

			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.completed).toBe(true);
			}
		});

		it("should allow empty query", () => {
			const input = {};

			const result = todoQuerySchema.safeParse(input);

			expect(result.success).toBe(true);
		});
	});
});
