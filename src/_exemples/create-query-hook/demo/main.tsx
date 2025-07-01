"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  useActionMutation,
  useActionQuery,
  useCreateUser,
  useDeleteUser,
  useGetUsers,
  useResetUsers,
} from "./client";
import { Button } from "@/components/ui/button";
import { FakeUser } from "./action";

export type MainProps = {};

export default function Main({}: MainProps) {
  const { users, isGetting } = useGetUsers();
  const { deleteUser, userIdDeleting, isDeleting } = useDeleteUser();
  const { resetUsers, isResetting } = useResetUsers();
  const { createUser, isCreating } = useCreateUser();
  if (isGetting) {
    return <div>Loading...</div>;
  }
  if (isResetting) {
    return <div>Resetting...</div>;
  }
  return (
    <div>
      <h1>
        Users List <Button onClick={() => resetUsers(0)}>reset</Button>{" "}
      </h1>
      <Card className="h-[200px] overflow-auto">
        <CardContent>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="mb-2">
                <strong>{user.name}</strong>- {user.age} - {user.email}{" "}
                <Button
                  variant="destructive"
                  size={"sm"}
                  onClick={() => deleteUser(user.id)}
                  disabled={isDeleting}
                >
                  {isDeleting && userIdDeleting === user.id
                    ? "Deleting..."
                    : "Delete"}
                </Button>
              </li>
            ))}
            {users.length === 0 && <li>No users found.</li>}
          </ul>
        </CardContent>
      </Card>
      <form
        action={(data) => {
          createUser({
            name: data.get("name") as string,
            email: data.get("email") as string,
            age: Number(data.get("age")) || (0 as number),
            isActive: true,
          });
        }}
        className="flex flex-col gap-2 my-4 border p-4 rounded-lg bg-muted/50"
      >
        <input name="name" type="text" placeholder="Name" />
        <input name="email" type="email" placeholder="Email" />
        <input name="age" type="number" placeholder="Age" />
        <Button type="submit">Create User</Button>
      </form>
    </div>
  );
}
