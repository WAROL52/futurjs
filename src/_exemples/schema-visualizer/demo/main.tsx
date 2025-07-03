"use client";

import { use, useEffect, useState } from "react";
import { initialEdges, initialNodes } from "./schema-data";
import { SchemaVisualizer } from "@/shared/prisma/block/schema-visualizer";
import { getPrismaSchema } from "./schema-prisma";
import { Prisma } from "@/generated/prisma";
import { Edge, Node } from "@xyflow/react";

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
  const [{ edges, nodes }, setnode] = useState<{
    nodes: Node[];
    edges: Edge[];
  }>({
    nodes: [],
    edges: [],
  });
  useEffect(() => {
    getPrismaSchema().then((datamodel) => {
      const { nodes, edges } = prismaSchemaToNode(datamodel);
      setnode({ nodes, edges });
    });
  }, []);
  return {
    nodes,
    edges,
  };
}

function prismaSchemaToNode(datamodel: Prisma.DMMF.Datamodel): {
  nodes: Node[];
  edges: Edge[];
} {
  console.log(datamodel);

  return {
    nodes: datamodel.models.map((model) => {
      return {
        id: model.name,
        type: "tableNode",
        position: { x: 100, y: 100 }, // Position can be adjusted later
        data: {
          label: model.name,
          fields: model.fields.map((field) => ({
            name: field.name,
            type: field.type,
            isPrimary: field.isId,
            isForeign: field.kind === "object" && field.isRequired,
          })),
        },
      };
    }),
    edges: datamodel.models.flatMap((model) => {
      return model.fields
        .filter((field) => field.relationName)
        .map((field) => {
          return {
            id: `${field.relationName}`,
            source: model.name,
            target: field.type,
            sourceHandle: field?.relationFromFields?.at(0),
            targetHandle: field?.relationToFields?.at(0),
            animated: true,
          };
        });
    }),
  };
}
