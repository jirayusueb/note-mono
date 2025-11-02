import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";

import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import "../index.css";

const fontSans = Geist_Mono({
	variable: "--font-sans",
	subsets: ["latin"],
	display: "swap",
});

const fontMono = Geist_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Note Mono",
	description: "A modern note-taking application built with Next.js and Elysia",
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	const fontClasses = [
		fontSans.variable,
		fontMono.variable,
		"antialiased",
	].join(" ");

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={fontClasses}>
				<Providers>
					<Toaster />
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	);
}
