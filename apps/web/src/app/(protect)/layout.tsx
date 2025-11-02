"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import AppSidebar from "@/components/app-sidebar";
import Loader from "@/components/loader";
import { Separator } from "@/components/ui/separator";
import {
	Sidebar,
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

interface ProtectLayoutProps {
	children: React.ReactNode;
}

export default function ProtectLayout({ children }: ProtectLayoutProps) {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();

	useEffect(() => {
		if (!isPending && !session) {
			router.push("/login");
		}
	}, [session, isPending, router]);

	if (isPending) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Loader />
			</div>
		);
	}

	if (!session) {
		return null;
	}

	return (
		<SidebarProvider>
			<Sidebar>
				<AppSidebar />
			</Sidebar>
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger />
					<Separator orientation="vertical" className="h-4" />
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
