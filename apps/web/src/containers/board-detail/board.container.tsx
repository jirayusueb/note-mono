"use client";

import { useSyncDemo } from "@tldraw/sync";
import { useState } from "react";
import { type TLUserPreferences, Tldraw, useTldrawUser } from "tldraw";
import "tldraw/tldraw.css";

import NiceModal from "@ebay/nice-modal-react";
import { Settings } from "lucide-react";

import BoardSettingsModal from "./components/board-settings-modal";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { authClient } from "@/lib/auth-client";

interface BoardContainerProps {
	boardId?: string;
}

function generateColorFromName(name: string): string {
	// Tailwind color palette - using 500 shades for good visibility
	const tailwindColors = [
		"#ef4444", // red-500
		"#f97316", // orange-500
		"#f59e0b", // amber-500
		"#eab308", // yellow-500
		"#84cc16", // lime-500
		"#22c55e", // green-500
		"#10b981", // emerald-500
		"#14b8a6", // teal-500
		"#06b6d4", // cyan-500
		"#3b82f6", // blue-500
		"#6366f1", // indigo-500
		"#8b5cf6", // violet-500
		"#a855f7", // purple-500
		"#d946ef", // fuchsia-500
		"#ec4899", // pink-500
		"#f43f5e", // rose-500
	];

	// Simple hash function to convert string to number
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}

	// Use hash to select a color from the palette
	const colorIndex = Math.abs(hash) % tailwindColors.length;

	return tailwindColors[colorIndex] || "#3b82f6"; // fallback to blue-500
}

function BoardContainer({ boardId = "default" }: BoardContainerProps) {
	const { data: session } = authClient.useSession();
	const user = session?.user;

	const userId = user?.id || `anonymous-${Math.random()}`;
	const userName = user?.name || user?.email || "Anonymous";
	const userColor = generateColorFromName(userName);

	const [userPreferences, setUserPreferences] = useState<TLUserPreferences>({
		id: userId,
		name: userName,
		color: userColor,
		colorScheme: "light",
	});

	const store = useSyncDemo({
		roomId: boardId,
		userInfo: userPreferences,
	});

	const tldrawUser = useTldrawUser({
		userPreferences,
		setUserPreferences,
	});

	const SharePanel = () => {
		const initials = userName
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);

		const handleOpenSettings = () => {
			NiceModal.show(BoardSettingsModal, { boardId });
		};

		return (
			<div className="w-full p-2">
				<div className="flex items-center justify-end gap-2">
					<Tooltip>
						<TooltipTrigger asChild>
							<div
								className="flex size-6 cursor-pointer items-center justify-center rounded-full text-xs font-medium text-white"
								style={{ backgroundColor: userColor }}
							>
								{initials}
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>{userName}</p>
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size="icon"
								variant="ghost"
								className="size-6"
								onClick={handleOpenSettings}
							>
								<Settings className="size-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Settings</p>
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
		);
	};

	const components = {
		SharePanel,
	};

	return (
		<div className="fixed inset-0">
			<Tldraw store={store} user={tldrawUser} components={components} />
		</div>
	);
}

export default BoardContainer;
