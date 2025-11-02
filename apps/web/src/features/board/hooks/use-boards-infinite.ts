import { useInfiniteQuery } from "@tanstack/react-query";

import { boardKey } from "@/features/board/consts";
import type { PaginatedBoards } from "@/features/board/types";
import { client } from "@/lib/client";

interface BoardFilters {
	limit?: number;
}

function useBoardsInfinite(filters?: BoardFilters) {
	return useInfiniteQuery({
		queryKey: boardKey.infinite(filters),
		queryFn: async ({ pageParam }: { pageParam: number }) => {
			const response = await client.api.boards.get({
				query: {
					page: pageParam,
					limit: filters?.limit ?? 10,
				},
			});

			return response.data?.data as PaginatedBoards | undefined;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage: PaginatedBoards | undefined) => {
			if (!lastPage?.pagination) {
				return undefined;
			}

			const { page, totalPages } = lastPage.pagination;

			if (page >= totalPages) {
				return undefined;
			}

			return page + 1;
		},
	});
}

export default useBoardsInfinite;
