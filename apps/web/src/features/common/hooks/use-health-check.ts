import { useQuery } from "@tanstack/react-query";

import { healthKey } from "@/features/common/consts";
import { client } from "@/lib/client";

function useHealthCheck() {
	return useQuery({
		queryKey: healthKey.all,
		queryFn: async () => {
			const response = await client.health.get();
			return response;
		},
		refetchInterval: 30_000, // Refetch every 30 seconds
		refetchIntervalInBackground: true,
	});
}

export default useHealthCheck;
