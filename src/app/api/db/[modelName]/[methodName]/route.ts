import { PrismaClient } from "@/generated/prisma";
import { DbClient } from "@/registry/prisma/lib/db-api-client";
import { createDbApiServer } from "@/registry/prisma/lib/db-api-server";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const dbApiServer = createDbApiServer<DbClient<PrismaClient>>(prisma);
export async function POST(
  request: Request,
  { params }: { params: Promise<{ modelName: string; methodName: string }> }
) {
  const { args } = await request.json();
  const { modelName, methodName } = await params;

  console.log(`+ model: ${modelName}, method: ${methodName}`);

  const { data, error } = await dbApiServer.handleRequest({
    modelName,
    methodName,
    args,
  });

  if (error) {
    console.log("================ ERROR ======================");
    console.error(error);
    return NextResponse.json(String(error), { status: 400 });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json({ users });
}
