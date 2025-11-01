export const todoKey = {
	all: ["todos"] as const,
	lists: () => [...todoKey.all, "list"] as const,
	list: (filters?: { userId?: string; completed?: boolean }) =>
		[...todoKey.lists(), filters] as const,
	details: () => [...todoKey.all, "detail"] as const,
	detail: (id: string) => [...todoKey.details(), id] as const,
} as const;
