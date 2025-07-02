"use client";
import * as user from "./action";
import { createQueryHook } from "@/shared/prisma/lib/create-query-hook";

export const { useActionMutation, useActionQuery } = createQueryHook({
  user,
});

export function useGetUsers() {
  const { data: users = [], isLoading: isGetting } = useActionQuery({
    queryKey: ["users"],
    queryFn: (db) => db.user.getUsers(),
  });
  return { users, isGetting };
}

export function useDeleteUser() {
  const {
    mutate: deleteUser,
    variables: userIdDeleting,
    isPending: isDeleting,
  } = useActionMutation({
    invalidateOnSuccess: [["users"]],
    mutationFn: (id: string, db) => db.user.deleteUser(id),
  });
  return { deleteUser, userIdDeleting, isDeleting };
}

export function useCreateUser() {
  const { mutate: createUser, isPending: isCreating } = useActionMutation({
    invalidateOnSuccess: [["users"]],
    mutationFn: (user: Omit<user.FakeUser, "id">, db) =>
      db.user.createUser(user),
  });
  return { createUser, isCreating };
}

export function useUpdateUser() {
  const { mutate: updateUser, isPending: isUpdating } = useActionMutation({
    invalidateOnSuccess: [["users"]],
    mutationFn: (args: { id: string; user: Partial<user.FakeUser> }, db) =>
      db.user.updateUser(args),
  });
  return { updateUser, isUpdating };
}

export function useResetUsers() {
  const { mutate: resetUsers, isPending: isResetting } = useActionMutation({
    mutationFn: (_, db) => db.user.resetUsers(),
    invalidateOnSuccess: [["users"]],
  });
  return { resetUsers, isResetting };
}
