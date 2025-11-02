"use client";

import { formatDistanceToNow } from "date-fns";
import { Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Board } from "@/features/board/types";

interface BoardItemProps {
	board: Board;
}

function BoardItem({ board }: BoardItemProps) {
	const handleCopyLink = async () => {
		const boardUrl = `${window.location.origin}/board/${board.id}`;

		try {
			await navigator.clipboard.writeText(boardUrl);
			toast.success("Link copied to clipboard");
		} catch {
			toast.error("Failed to copy link");
		}
	};

	const createdDate = new Date(board.createdAt);
	const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true });

	return (
		<Card className="flex flex-col">
			<CardHeader>
				<div className="flex items-start justify-between gap-2">
					<div className="flex-1 min-w-0">
						<CardTitle className="line-clamp-2">{board.name}</CardTitle>
						{board.description && (
							<CardDescription className="mt-1 line-clamp-2">
								{board.description}
							</CardDescription>
						)}
					</div>
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 shrink-0"
						onClick={handleCopyLink}
						title="Copy board link"
					>
						<Copy className="size-4" />
					</Button>
				</div>
				<p className="mt-2 text-muted-foreground text-xs">
					Created {timeAgo}
				</p>
			</CardHeader>
			<CardContent className="mt-auto">
				<Button asChild variant="outline" className="w-full">
					<Link href={`/board/${board.id}`}>
						<ExternalLink className="mr-2 size-4" />
						Open Board
					</Link>
				</Button>
			</CardContent>
		</Card>
	);
}

export default BoardItem;

