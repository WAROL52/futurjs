import { PrismaClient } from "@/generated/prisma";
import { DbHookPrisma } from "@/shared/prisma/lib/create-db-api-client";
import { createDbApiServer } from "@/shared/prisma/lib/create-db-api-server";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const dbApiServer = createDbApiServer<DbHookPrisma<PrismaClient>>(prisma);
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
  prisma.post.create({
    data: {
      content: "Hello World",
      title: "My first post",
      authorId: "1",
    },
  });
  return Response.json({ users });
}
