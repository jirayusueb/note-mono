"use client";

import { Loader2 } from "lucide-react";

import TodoItem from "./todo-item";
import { Card, CardContent } from "@/components/ui/card";
import { useTodos } from "@/features/todo/hooks";
import type { Todo } from "@/features/todo/types";

interface TodoListProps {
	userId?: string;
	completed?: boolean;
}

function TodoList({ userId, completed }: TodoListProps) {
	const { data, isLoading, error } = useTodos({
		userId,
		completed,
	});

	if (isLoading) {
		return (
			<Card>
				<CardContent className="flex items-center justify-center py-12">
					<Loader2 className="size-6 animate-spin text-muted-foreground" />
				</CardContent>
			</Card>
		);
	}

	if (error) {
		return (
			<Card>
				<CardContent className="py-12 text-center text-destructive">
					<p>Failed to load todos. Please try again later.</p>
				</CardContent>
			</Card>
		);
	}

	const rawTodos = data?.items ?? [];

	if (rawTodos.length === 0) {
		return (
			<Card>
				<CardContent className="py-12 text-center text-muted-foreground">
					<p>No todos yet. Create your first todo above!</p>
				</CardContent>
			</Card>
		);
	}

	// Transform Date objects to strings for frontend compatibility
	const todos: Todo[] = rawTodos.map((todo) => ({
		...todo,
		createdAt:
			typeof todo.createdAt === "string"
				? todo.createdAt
				: todo.createdAt instanceof Date
					? todo.createdAt.toISOString()
					: String(todo.createdAt),
		updatedAt:
			typeof todo.updatedAt === "string"
				? todo.updatedAt
				: todo.updatedAt instanceof Date
					? todo.updatedAt.toISOString()
					: String(todo.updatedAt),
	}));

	return (
		<div className="space-y-4">
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</div>
	);
}

export default TodoList;
