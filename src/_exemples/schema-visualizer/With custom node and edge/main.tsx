"use client";

import { initialEdges, initialNodes } from "./schema-data";
import { SchemaVisualizer } from "@/shared/prisma/block/schema-visualizer";

export type MainProps = {};

export default function Main({}: MainProps) {
  // return "use client";
  return (
    <div className="min-h-[50svh] flex flex-col">
      <SchemaVisualizer
        initialEdges={initialEdges}
        initialNodes={initialNodes}
      />
    </div>
  );
}
