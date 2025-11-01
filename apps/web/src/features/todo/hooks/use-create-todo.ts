import { useMutation, useQueryClient } from "@tanstack/react-query";

import { todoKey } from "@/features/todo/consts";
import { client } from "@/lib/client";

interface CreateTodoInput {
	title: string;
	description?: string | null;
	completed: boolean;
	userId: string;
}

function useCreateTodo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: CreateTodoInput) => {
			const response = await client.api.todos.post(input);

			return response.data?.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: todoKey.all });
		},
	});
}

export default useCreateTodo;
