"use server";
import { Prisma, PrismaClient } from "@/generated/prisma";

export async function getPrismaSchema() {
  return Prisma.dmmf.datamodel as Prisma.DMMF.Datamodel;
}

export async function prismaActions() {
  return null;
}
