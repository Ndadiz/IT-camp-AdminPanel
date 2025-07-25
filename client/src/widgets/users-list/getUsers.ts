import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@shared/api/users";
import type { User} from "@entities/model/users";
export const useGetUsers = () => {
  return useQuery< User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};