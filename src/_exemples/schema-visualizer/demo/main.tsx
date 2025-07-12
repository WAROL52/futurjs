"use client";

import { SchemaVisualizer } from "@/shared/prisma/block/schema-visualizer";
import { usePrismaSchema } from "@/shared/prisma/hooks/use-prisma-schema";

export type MainProps = {};

export default function Main({}: MainProps) {
  const { data, isLoading } = usePrismaSchema();

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading schema...</p>
      </div>
    );
  const { nodes, edges } = data.xyflow;
  return (
    <div className="h-screen flex flex-col">
      <SchemaVisualizer initialNodes={nodes} initialEdges={edges} />
    </div>
  );
}
