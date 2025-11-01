import type { Metadata } from "next";
import { IBM_Plex_Serif, Outfit } from "next/font/google";

import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import "../index.css";

const outfit = Outfit({
	variable: "--font-sans",
	subsets: ["latin"],
	display: "swap",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const ibmPlexSerif = IBM_Plex_Serif({
	variable: "--font-serif",
	subsets: ["latin"],
	display: "swap",
	weight: ["100", "200", "300", "400", "500", "600", "700"],
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
		outfit.variable,
		ibmPlexSerif.variable,
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
