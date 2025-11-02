"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { toast } from "sonner";

import { BoardList, BoardListSkeleton } from "./components";
import { Button } from "@/components/ui/button";
import { useCreateBoard } from "@/features/board/hooks";

function BoardsContainer() {
	const router = useRouter();

	const { mutate: createBoard, isPending } = useCreateBoard();

	const handleCreateBoard = () => {
		createBoard(
			{
				name: "New Board",
				description: "New Board Description",
			},
			{
				onSuccess: (data) => {
					if (data?.id) {
						router.push(`/board/${data.id}`);
					}
				},
				onError: () => {
					toast.error("Failed to create board");
				},
			},
		);
	};

	return (
		<div className="container mx-auto max-w-6xl py-8 px-4">
			<div className="mb-8">
				<div className="mb-4 flex items-center justify-between">
					<div>
						<h1 className="mb-2 font-bold text-4xl">Boards</h1>
						<p className="text-muted-foreground text-lg">
							Create and manage your drawing boards
						</p>
					</div>
					<Button onClick={handleCreateBoard} disabled={isPending}>
						<Plus className="mr-2 size-4" />
						Create Board
					</Button>
				</div>
			</div>

			<Suspense fallback={<BoardListSkeleton />}>
				<BoardList />
			</Suspense>
		</div>
	);
}

export default BoardsContainer;
