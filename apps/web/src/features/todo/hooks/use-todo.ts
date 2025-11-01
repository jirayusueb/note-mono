import { useQuery } from "@tanstack/react-query";

import { todoKey } from "@/features/todo/consts";
import { client } from "@/lib/client";

function useTodo(id: string) {
	return useQuery({
		queryKey: todoKey.detail(id),
		queryFn: async () => {
			const response = await client.api.todos({ id }).get();

			return response.data?.data;
		},
		enabled: !!id,
	});
}

export default useTodo;
