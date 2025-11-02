import { Card, CardContent } from "@/components/ui/card";

export default function BoardListEmpty() {
	return (
		<Card>
			<CardContent className="py-12 text-center text-muted-foreground">
				<p>No boards yet. Create your first board above!</p>
			</CardContent>
		</Card>
	);
}

