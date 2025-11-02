export interface Board {
	id: string;
	name: string;
	description: string | null;
	userId: string;
	createdAt: string;
	updatedAt: string;
}

export interface PaginatedBoards {
	items: Board[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

