import { useMutation, useQueryClient } from "@tanstack/react-query";

import { todoKey } from "@/features/todo/consts";
import { client } from "@/lib/client";

function useDeleteTodo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			await client.api.todos({ id }).delete();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: todoKey.all });
		},
	});
}

export default useDeleteTodo;
