"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LayoutList } from "lucide-react";

import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

function AppSidebar() {
	const pathname = usePathname();

	const navItems = [
		{
			title: "Boards",
			href: "/board",
			icon: LayoutDashboard,
		},
		{
			title: "Todos",
			href: "/todos",
			icon: LayoutList,
		},
	];

	return (
		<SidebarContent>
			<SidebarGroup>
				<SidebarGroupLabel>Navigation</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{navItems.map((item) => {
							const isActive = pathname?.startsWith(item.href);
							return (
								<SidebarMenuItem key={item.href}>
									<SidebarMenuButton
										asChild
										isActive={isActive}
										tooltip={item.title}
									>
										<Link href={item.href}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarContent>
	);
}

export default AppSidebar;

