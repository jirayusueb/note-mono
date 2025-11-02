import { useMutation, useQueryClient } from "@tanstack/react-query";

import { boardKey } from "@/features/board/consts";
import type { Board } from "@/features/board/types";
import { client } from "@/lib/client";

interface CreateBoardInput {
	name: string;
	description?: string | null;
}

function useCreateBoard() {
	const queryClient = useQueryClient();

	return useMutation<Board | undefined, Error, CreateBoardInput>({
		mutationFn: async (input: CreateBoardInput) => {
			const response = await client.api.boards.post(input);

			return response.data?.data as Board | undefined;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: boardKey.all });
		},
	});
}

export default useCreateBoard;
