import { useQuery } from "@tanstack/react-query";

import { todoKey } from "@/features/todo/consts";
import { client } from "@/lib/client";

interface TodoFilters {
	userId?: string;
	completed?: boolean;
	page?: number;
	limit?: number;
}

function useTodos(filters?: TodoFilters) {
	return useQuery({
		queryKey: todoKey.list(filters),
		queryFn: async () => {
			const response = await client.api.todos.get({
				query: {
					userId: filters?.userId,
					completed: filters?.completed,
					page: filters?.page ?? 1,
					limit: filters?.limit ?? 10,
				},
			});

			return response.data?.data;
		},
	});
}

export default useTodos;
