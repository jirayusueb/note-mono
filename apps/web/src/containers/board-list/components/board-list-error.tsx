import { Card, CardContent } from "@/components/ui/card";

export default function BoardListError() {
	return (
		<Card>
			<CardContent className="py-12 text-center text-destructive">
				<p>Failed to load boards. Please try again later.</p>
			</CardContent>
		</Card>
	);
}

