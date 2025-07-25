import { useQuery } from "@tanstack/react-query";
import { fetchOne } from "@shared/api/users";

export const useGetOne = (id:string) => { 
    return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchOne(id),
    enabled: !!id,
  });
};
