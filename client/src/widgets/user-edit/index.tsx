import { useParams, useNavigate } from "react-router";
import type { User } from "@entities/model/users";
import { useMutation } from "@tanstack/react-query";
import { createUser, updateUser } from "@shared/api/users";
import ServerStatus from "@shared/ui/ServerStatus";
import EditUserForm from "@features/edit-user/EditUserForm";
import { useGetOne } from "./api/getOne";

export function UserEditor() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => navigate("/"),
  });

  const updateMutation = useMutation<
    User,
    Error,
    { id: string; user: Partial<User> }
  >({
    mutationFn: ({ id, user }) => updateUser(id, user),
    onSuccess: () => navigate("/"),
  });

  const { data: currentUser, isLoading, error } = useGetOne(id!);
  if (isLoading) return <ServerStatus>Loading...</ServerStatus>;
  if (error) return <ServerStatus>Error: {error.message}</ServerStatus>;

  if (!id ) {
    const handleSave = (changes: Partial<User>) => {
      createMutation.mutate(changes as Omit<User, "id">);
    };

    return <EditUserForm onSave={handleSave}  flag = 'create'/>;
  }


  const handleSave = (changes: Partial<User>) => {
  // Создаём новый объект без email и password
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { email, password, ...rest } = changes;

  const formattedChanges = {
    ...rest,
  };

  updateMutation.mutate({ id: id, user: formattedChanges });
};

  return <EditUserForm user={currentUser} onSave={handleSave} flag = 'edit'/>;
}

