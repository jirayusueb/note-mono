export interface Todo {
	id: string;
	title: string;
	description: string | null;
	completed: boolean;
	userId: string;
	createdAt: string;
	updatedAt: string;
}

export interface PaginatedTodos {
	items: Todo[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}
