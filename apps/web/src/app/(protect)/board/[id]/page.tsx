import { BoardContainer } from "@/containers/board-detail";

interface BoardPageProps {
	params: Promise<{ id: string }>;
}

export default async function BoardPage({ params }: BoardPageProps) {
	const { id } = await params;

	return <BoardContainer boardId={id} />;
}
