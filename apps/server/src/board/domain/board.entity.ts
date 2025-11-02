export interface Board {
	id: string;
	name: string;
	description: string | null;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}
