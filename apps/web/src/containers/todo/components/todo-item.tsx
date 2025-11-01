"use client";

import { Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useDeleteTodo, useUpdateTodo } from "@/features/todo/hooks";
import type { Todo } from "@/features/todo/types";

interface TodoItemProps {
	todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
	const updateTodo = useUpdateTodo();
	const deleteTodo = useDeleteTodo();

	const handleToggleComplete = async () => {
		await updateTodo.mutateAsync({
			id: todo.id,
			input: {
				completed: !todo.completed,
			},
		});
	};

	const handleDelete = async () => {
		await deleteTodo.mutateAsync(todo.id);
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex items-start justify-between gap-4">
					<div className="flex items-start gap-3 flex-1">
						<Checkbox
							checked={todo.completed}
							onCheckedChange={handleToggleComplete}
							disabled={updateTodo.isPending}
							className="mt-1"
						/>
						<div className="flex-1 min-w-0">
							<CardTitle
								className={
									todo.completed ? "line-through text-muted-foreground" : ""
								}
							>
								{todo.title}
							</CardTitle>
							{todo.description && (
								<CardDescription className="mt-1">
									{todo.description}
								</CardDescription>
							)}
						</div>
					</div>
					<Button
						variant="ghost"
						size="icon"
						onClick={handleDelete}
						disabled={deleteTodo.isPending}
						className="shrink-0"
					>
						{deleteTodo.isPending ? (
							<Loader2 className="size-4 animate-spin" />
						) : (
							<Trash2 className="size-4" />
						)}
					</Button>
				</div>
			</CardHeader>
		</Card>
	);
}

export default TodoItem;
