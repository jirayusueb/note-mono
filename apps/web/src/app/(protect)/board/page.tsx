"use client";

import { Suspense } from "react";

import { BoardsContainer } from "@/containers/board-list";
import { BoardsContainerSkeleton } from "@/containers/board-list/components";

export default function BoardPage() {
	return (
		<Suspense fallback={<BoardsContainerSkeleton />}>
			<BoardsContainer />
		</Suspense>
	);
}
