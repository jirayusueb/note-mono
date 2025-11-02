"use client";

import { Suspense } from "react";

import { LoginContainer } from "@/containers/login";
import { LoginContainerSkeleton } from "@/containers/login/components";

export default function Page() {
	return (
		<Suspense fallback={<LoginContainerSkeleton />}>
			<LoginContainer />
		</Suspense>
	);
}
