"use client";

import { Prisma } from "@/generated/prisma";
import { Edge, Node } from "@xyflow/react";
import { useQuery } from "@tanstack/react-query";
import { getPrismaSchema } from "@/shared/prisma/actions/prisma-actions";

export type PrismaSchema = {
  datamodel: Prisma.DMMF.Datamodel;
  xyflow: {
    nodes: Node[];
    edges: Edge[];
  };
};
export const defaultPrismaSchema: PrismaSchema = {
  datamodel: {
    models: [],
    enums: [],
    indexes: [],
    types: [],
  },
  xyflow: {
    nodes: [],
    edges: [],
  },
};

export function usePrismaSchema() {
  const { data, isLoading } = useQuery({
    queryKey: ["prisma-schema"],
    queryFn: async () => {
      const datamodel = await getPrismaSchema();
      const schema: PrismaSchema = {
        datamodel,
        xyflow: datamodelToXyflow(datamodel),
      };
      return schema;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  if (!data)
    return {
      isLoading,
      data: defaultPrismaSchema,
    };
  return {
    isLoading,
    data,
  };
}

usePrismaSchema.registryDependencies = ["prisma-actions"];
usePrismaSchema.dependencies = ["@tanstack/react-query", "@xyflow/react"];

function getStableColor(modelName: string): string {
  const hash = [...modelName].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 60%)`;
}

function datamodelToXyflow(datamodel: Prisma.DMMF.Datamodel): {
  nodes: Node[];
  edges: Edge[];
} {
  const modelColorMap = new Map<string, string>();
  const numColumns = 6;
  const columnWidth = 300;
  const columnHeights = new Array(numColumns).fill(100); // start y=100 pour chaque colonne

  const nodes: Node[] = datamodel.models.map((model, i) => {
    const height = model.fields.length * 30 + 100;

    // Trouver la colonne la moins haute
    const minCol = columnHeights.indexOf(Math.min(...columnHeights));
    const x = minCol * columnWidth;
    const y = columnHeights[minCol];

    columnHeights[minCol] += height + 50; // 50px de marge verticale

    const color = getStableColor(model.name);
    modelColorMap.set(model.name, color);

    return {
      id: model.name,
      type: "tableNode",
      position: { x, y },
      data: {
        label: model.name,
        color,
        fields: model.fields.map((field) => ({
          name: field.name,
          type: field.type,
          isPrimary: field.isId,
          isForeign: field.isReadOnly,
          meta: field,
        })),
      },
    };
  });

  const edges: Edge[] = datamodel.models.flatMap((model) => {
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
          source: field.type,
          target: model.name,
          sourceHandle: field?.relationToFields?.at(0),
          targetHandle: field?.relationFromFields?.at(0),
          animated: true,
          // style: {
          //   stroke: modelColorMap.get(model.name) || "#999",
          // },
        };
      });
  });

  return { nodes, edges };
}
