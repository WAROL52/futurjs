"use server";

export type FakeUser = {
  id: string;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
};

export async function getUsers() {
  return data;
}

export async function getUserById(id: string) {
  return data.find((user) => user.id === id) || null;
}

export async function createUser(user: Omit<FakeUser, "id">) {
  const newUser: FakeUser = {
    id: (data.length + 1).toString(),
    ...user,
  };
  data.push(newUser);
  return newUser;
}

export async function updateUser({
  id,
  user,
}: {
  id: string;
  user: Partial<FakeUser>;
}) {
  const index = data.findIndex((u) => u.id === id);
  if (index === -1) {
    return null;
  }
  const updatedUser = { ...data[index], ...user };
  data[index] = updatedUser;
  return updatedUser;
}

export async function deleteUser(id: string) {
  const index = data.findIndex((u) => u.id === id);
  if (index === -1) {
    return null;
  }
  const deletedUser = data[index];
  data.splice(index, 1);
  return deletedUser;
}
export async function resetUsers() {
  data.splice(0, data.length, ...dataDefault);

  return data;
}

const dataDefault: FakeUser[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30,
    isActive: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 25,
    isActive: false,
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    age: 28,
    isActive: true,
  },
];

const data = [...dataDefault];
