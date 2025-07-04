"use client";

import { usePrismaSchema } from "@/shared/prisma/hooks/use-prisma-schema";

export type MainProps = {};

export default function Main({}: MainProps) {
  const { data, isLoading } = usePrismaSchema();
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {data && (
        <pre className="h-[50svh] flex flex-col overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
