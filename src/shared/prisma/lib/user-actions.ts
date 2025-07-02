"use server";

export async function getUsers() {
  return [{ id: 1, name: "John Doe" }];
}

export async function getUserById(id: number) {
  // Simulate a user fetch
  return { id, name: "John Doe" };
}

export async function createUser(email: string) {
  // Simulate a user creation
  return { id: Math.random(), email };
}

export async function updateUser({ id, email }: { id: number; email: string }) {
  // Simulate a user update
  return { id, email };
}

export async function deleteUser(id: number) {
  // Simulate a user deletion
  return { id, deleted: true };
}
