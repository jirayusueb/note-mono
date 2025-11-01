import { useMutation, useQueryClient } from "@tanstack/react-query";

import { todoKey } from "@/features/todo/consts";
import { client } from "@/lib/client";

interface UpdateTodoInput {
	title?: string;
	description?: string | null;
	completed?: boolean;
}

function useUpdateTodo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			id,
			input,
		}: {
			id: string;
			input: UpdateTodoInput;
		}) => {
			const response = await client.api.todos({ id }).patch(input);

			return response.data?.data;
		},
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: todoKey.all });
			queryClient.invalidateQueries({ queryKey: todoKey.detail(variables.id) });
		},
	});
}

export default useUpdateTodo;
