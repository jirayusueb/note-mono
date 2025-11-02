"use client";

import NiceModal, { useModal } from "@ebay/nice-modal-react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface BoardSettingsModalProps {
	boardId?: string;
}

function BoardSettingsModal({ boardId }: BoardSettingsModalProps) {
	const modal = useModal();

	return (
		<Dialog open={modal.visible} onOpenChange={(open) => !open && modal.hide()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Board Settings</DialogTitle>
					<DialogDescription>
						Manage your board settings and preferences
					</DialogDescription>
				</DialogHeader>
				<div className="py-4">
					<p className="text-muted-foreground text-sm">
						Board ID: {boardId || "default"}
					</p>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => modal.hide()}>
						Close
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default NiceModal.create(BoardSettingsModal);
