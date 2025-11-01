"use client";

import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTodo } from "@/features/todo/hooks";

interface TodoFormProps {
	userId: string;
}

function TodoForm({ userId }: TodoFormProps) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const createTodo = useCreateTodo();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!title.trim()) {
			return;
		}

		await createTodo.mutateAsync({
			title: title.trim(),
			description: description.trim() || null,
			completed: false,
			userId,
		});

		setTitle("");
		setDescription("");
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Add New Todo</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Input
							placeholder="Todo title..."
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							disabled={createTodo.isPending}
							required
						/>
						<Textarea
							placeholder="Description (optional)"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							disabled={createTodo.isPending}
							rows={3}
						/>
					</div>
					<Button
						type="submit"
						disabled={createTodo.isPending || !title.trim()}
					>
						{createTodo.isPending ? (
							<>
								<Loader2 className="mr-2 size-4 animate-spin" />
								Adding...
							</>
						) : (
							<>
								<Plus className="mr-2 size-4" />
								Add Todo
							</>
						)}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}

export default TodoForm;
