"use client";
import * as userAction from "@/registry/prisma/lib/user-actions";
import { createQueryHook } from "./query-hook";
export function createQueryActions<T>(dbClient: T) {
  return {
    useActionQuery: () => {},
    useActionMutation: () => {},
  };
}

const { useDbQuery: useActionQuery, useDbMutation: useActionMutation } =
  createQueryHook({
    user: {
      ...userAction,
      async login({ email, password }: { email: string; password: string }) {
        return (await userAction.getUsers()).find(
          (user) => user.name === email && user.name === password
        );
      },
    },
  });

function TestComponent() {
  const { data, isLoading, error } = useActionQuery({
    queryKey: ["test", "findMany"],
    queryFn: (query) => query.user.getUsers(),
  });
  return (
    <div>
      <h1>Test Component</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
