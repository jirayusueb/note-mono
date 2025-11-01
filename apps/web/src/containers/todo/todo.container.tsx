"use client";

import { useState } from "react";

import { TodoForm, TodoList } from "./components";
import { Button } from "@/components/ui/button";

// TODO: Get actual user ID from auth context
const MOCK_USER_ID = "user-123";

function TodoContainer() {
	const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

	const filterProps =
		filter === "active"
			? { completed: false }
			: filter === "completed"
				? { completed: true }
				: {};

	return (
		<div className="container mx-auto max-w-4xl py-8 px-4">
			<div className="mb-8">
				<h1 className="mb-2 font-bold text-4xl">Todos</h1>
				<p className="text-muted-foreground text-lg">
					Manage your tasks and stay organized
				</p>
			</div>

			<div className="mb-6 space-y-4">
				<TodoForm userId={MOCK_USER_ID} />

				<div className="flex gap-2">
					<Button
						variant={filter === "all" ? "default" : "outline"}
						size="sm"
						onClick={() => setFilter("all")}
					>
						All
					</Button>
					<Button
						variant={filter === "active" ? "default" : "outline"}
						size="sm"
						onClick={() => setFilter("active")}
					>
						Active
					</Button>
					<Button
						variant={filter === "completed" ? "default" : "outline"}
						size="sm"
						onClick={() => setFilter("completed")}
					>
						Completed
					</Button>
				</div>
			</div>

			<TodoList userId={MOCK_USER_ID} {...filterProps} />
		</div>
	);
}

export default TodoContainer;
