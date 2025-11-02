import { useQuery } from "@tanstack/react-query";

import { boardKey } from "@/features/board/consts";
import { client } from "@/lib/client";

interface BoardFilters {
	page?: number;
	limit?: number;
}

function useBoards(filters?: BoardFilters) {
	return useQuery({
		queryKey: boardKey.list(filters),
		queryFn: async () => {
			const response = await client.api.boards.get({
				query: {
					page: filters?.page ?? 1,
					limit: filters?.limit ?? 10,
				},
			});

			return response.data?.data;
		},
	});
}

export default useBoards;
