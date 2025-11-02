"use client";

import NiceModal from "@ebay/nice-modal-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import ThemeProvider from "@/components/theme-provider";
import { queryClient } from "@/lib/query-client";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				disableTransitionOnChange
				enableSystem
			>
				<NiceModal.Provider>
					{children}
					<Toaster richColors />
				</NiceModal.Provider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
