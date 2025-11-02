import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BoardListSkeleton() {
	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: 6 }).map((_, i) => (
				<Card key={i} className="flex flex-col">
					<CardHeader>
						<Skeleton className="mb-2 h-6 w-full" />
						<Skeleton className="h-4 w-3/4" />
					</CardHeader>
					<CardContent className="mt-auto">
						<Skeleton className="h-10 w-full" />
					</CardContent>
				</Card>
			))}
		</div>
	);
}

