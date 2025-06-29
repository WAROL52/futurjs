"use client";

import { useDbMutation, useDbQuery } from "@/lib/api-db-client";

export type PreviewProps = {};

export default function Preview({}: PreviewProps) {
  const {
    data = [],
    isLoading,
    error,
  } = useDbQuery({
    queryKey: ["user", "findMany"],
    queryFn: (dbClient) => dbClient.user.findMany(),
  });
  const mutation = useDbMutation({
    mutationKey: ["user", "create"],
    mutationFn: (email: string, dbClient) =>
      dbClient.user.create({ data: { email } }),
    invalidateOnSuccess: [["user", "findMany"]],
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error:-- {String(error)}</div>;
  if (mutation.error) {
    return (
      <div>
        Error creating user:
        <pre>{String(mutation.error)}</pre>
      </div>
    );
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.map((user: any) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button
        type="button"
        onClick={() => mutation.mutate("newuser@example.com")}
      >
        Create User
      </button>
    </div>
  );
}
