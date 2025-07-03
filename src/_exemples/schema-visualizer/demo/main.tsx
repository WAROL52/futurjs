"use client";

import { use, useEffect, useState } from "react";
import { initialEdges, initialNodes } from "./schema-data";
import { SchemaVisualizer } from "@/shared/prisma/block/schema-visualizer";
import { getPrismaSchema } from "./schema-prisma";
import { Prisma } from "@/generated/prisma";
import { Edge, Node } from "@xyflow/react";
import { useQuery } from "@tanstack/react-query";

export type MainProps = {};

export default function Main({}: MainProps) {
  const { nodes, edges } = useGetPrismaSchema();
  console.log("Nodes:", nodes);
  console.log("Edges:", edges);

  if (!nodes.length || !edges.length)
    return (
      <div className="min-h-[50svh] flex items-center justify-center">
        <p>Loading schema...</p>
      </div>
    );
  return (
    <div className="min-h-[50svh] flex flex-col">
      <SchemaVisualizer initialNodes={nodes} initialEdges={edges} />
    </div>
  );
}
function useGetPrismaSchema() {
  const { data } = useQuery({
    queryKey: ["prismaSchema"],
    queryFn: async () => {
      const datamodel = await getPrismaSchema();
      return prismaSchemaToNode(datamodel);
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  if (!data) return { nodes: [], edges: [] };
  return {
    nodes: data.nodes,
    edges: data.edges,
  };
}

function prismaSchemaToNode(datamodel: Prisma.DMMF.Datamodel): {
  nodes: Node[];
  edges: Edge[];
} {
  console.log(datamodel);
  const relationNames: string[] = [];
  let x = 0;

  return {
    nodes: datamodel.models.map((model) => {
      x += 300; // Increment x position for each model
      return {
        id: model.name,
        type: "tableNode",
        position: { x, y: 100 }, // Position can be adjusted later
        data: {
          label: model.name,
          fields: model.fields.map((field) => ({
            name: field.name,
            type: field.type,
            isPrimary: field.isId,
            isForeign: field.isReadOnly,
            meta: field,
          })),
        },
      };
    }),
    edges: datamodel.models.flatMap((model) => {
      return model.fields
        .filter(
          (field) =>
            field.relationName &&
            field?.relationFromFields?.length &&
            field?.relationToFields?.length
        )
        .map((field) => {
          return {
            id: `${field.relationName}`,
            source: model.name,
            target: field.type,
            sourceHandle: field?.relationToFields?.at(0) ? "warol" : undefined,
            targetHandle: field?.relationFromFields?.at(0),
            // animated: true,
          };
        });
    }),
  };
}
