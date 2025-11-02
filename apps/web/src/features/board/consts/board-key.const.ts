export const boardKey = {
	all: ["boards"] as const,
	lists: () => [...boardKey.all, "list"] as const,
	list: (filters?: { page?: number; limit?: number }) =>
		[...boardKey.lists(), filters] as const,
	infinite: (filters?: { limit?: number }) =>
		[...boardKey.all, "infinite", filters] as const,
	details: () => [...boardKey.all, "detail"] as const,
	detail: (id: string) => [...boardKey.details(), id] as const,
} as const;
