import { PrismaClient } from "@/generated/prisma";
import {
  createDbApiClient,
  DbHookPrisma,
} from "@/shared/prisma/lib/create-db-api-client";

export const { useDbQuery, useDbMutation } = createDbApiClient<
  DbHookPrisma<PrismaClient>
>({
  baseUrl: "/api/db",
});
