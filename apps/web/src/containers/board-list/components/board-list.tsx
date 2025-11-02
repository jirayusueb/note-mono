"use client";

import { Loader2 } from "lucide-react";

import BoardItem from "./board-item";
import BoardListEmpty from "./board-list-empty";
import BoardListError from "./board-list-error";
import BoardListSkeleton from "./board-list-skeleton";
import { Button } from "@/components/ui/button";
import { useBoardsInfinite } from "@/features/board/hooks";
import type { Board } from "@/features/board/types";

function BoardList() {
	const {
		data,
		error,
		isLoading,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	} = useBoardsInfinite({ limit: 6 });

	if (isLoading) {
		return <BoardListSkeleton />;
	}

	if (error) {
		return <BoardListError />;
	}

	const boards: Board[] =
		data?.pages.flatMap((page) => page?.items ?? []) ?? [];

	if (boards.length === 0) {
		return <BoardListEmpty />;
	}

	return (
		<>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{boards.map((board) => (
					<BoardItem key={board.id} board={board} />
				))}
			</div>
			{hasNextPage && (
				<div className="mt-8 flex justify-center">
					<Button
						onClick={() => fetchNextPage()}
						disabled={isFetchingNextPage}
						variant="outline"
					>
						{isFetchingNextPage ? (
							<>
								<Loader2 className="mr-2 size-4 animate-spin" />
								Loading...
							</>
						) : (
							"Load More"
						)}
					</Button>
				</div>
			)}
		</>
	);
}

export default BoardList;
