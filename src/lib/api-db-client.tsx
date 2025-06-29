import { PrismaClient } from "@/generated/prisma";
import { createDbApiClient } from "@/registry/prisma/lib/db-api-client";

export const { useDbQuery, useDbMutation } = createDbApiClient<PrismaClient>({
  baseUrl: "/api/db",
});
