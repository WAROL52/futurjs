"use client";

import { Prisma } from "@/generated/prisma";
import { Edge, Node } from "@xyflow/react";
import { useQuery } from "@tanstack/react-query";
import { getPrismaSchema } from "@/shared/prisma/actions/prisma-actions";
import z, { ZodEnum, ZodType } from "zod/v4";

export type FieldMeta = {
  enumProps: Prisma.DMMF.Datamodel["enums"][number];
  description: string;
  label: string;
  placeholder: string;
  allowDuplicates?: boolean;
  maxItems?: number;
};
export type FormMeta = {};
export type EnumMeta = {};

export type FormModel = {
  name: string;
  fields: FormModelField[];
  meta: Partial<FormMeta>;
  zodType: z.ZodObject<any>;
};

export type FormModelField = {
  props: Prisma.DMMF.Field;
  zodType: ZodType<any, any, any>;
  meta?: Partial<FieldMeta>;
};

export type FormEnum = {
  name: string;
  props: Prisma.DMMF.Datamodel["enums"][number];
  zodType: ZodEnum<any>;
  meta?: Partial<EnumMeta>;
};

export type PrismaForm = {
  models: FormModel[];
  enums: FormEnum[];
};

export type PrismaSchema = {
  datamodel: Prisma.DMMF.Datamodel;
  xyflow: {
    nodes: Node[];
    edges: Edge[];
  };
  form: PrismaForm;
};

export function datamodelToPrismaFormModel(
  datamodel: Prisma.DMMF.Datamodel,
  enums: FormEnum[]
): FormModel[] {
  const models = datamodel.models.map((model) => {
    const zodfields: Record<string, z.ZodType<any, any, any>> = {};

    return {
      name: model.name,
      meta: {},
      fields: model.fields
        .map((field) => {
          if (field.isId) return null;
          if (field.isReadOnly) return null;
          if (field.isUpdatedAt) return null;
          if (field.hasDefaultValue) {
            if (typeof field.default === "object" && "name" in field.default) {
              if (
                field.default.name === "now" ||
                field.default.name === "cuid" ||
                field.default.name === "uuid" ||
                field.default.name === "autoincrement" ||
                field.default.name === "updatedAt"
              ) {
                return null; // Skip rendering if default value is now, cuid, or uuid
              }
            }
          }
          zodfields[field.name] = prismaFieldToZodType(field, enums);
          return {
            props: field,
            zodType: zodfields[field.name],
            meta: {
              enumProps:
                field.kind === "enum"
                  ? enums.find((e) => e.name === field.type)?.props
                  : undefined,
            },
          };
        })
        .filter(Boolean) as FormModelField[], // Filter out null fields
      // Filter out empty fields
      zodType: z.object(zodfields),
    };
  });

  return models;
}

function prismaFieldToZodType(
  field: Prisma.DMMF.Field,
  enums: FormEnum[]
): ZodType<any, any, any> {
  // BigInt, Boolean, Bytes, DateTime, Decimal, Float, Int, JSON, String, $ModelName
  const scalarTypes = new Map<string, ZodType<any, any, any>>();
  scalarTypes.set("BigInt", z.bigint());
  scalarTypes.set("Boolean", z.boolean());
  scalarTypes.set("Bytes", z.instanceof(Buffer));
  scalarTypes.set("DateTime", z.date());
  scalarTypes.set(
    "Decimal",
    z.number().refine((val) => !isNaN(val), {
      message: "Invalid decimal value",
    })
  );
  scalarTypes.set(
    "Float",
    z.number().refine((val) => !isNaN(val), {
      message: "Invalid float value",
    })
  );
  scalarTypes.set(
    "Int",
    z
      .number()
      .int()
      .refine((val) => !isNaN(val), {
        message: "Invalid integer value",
      })
  );
  scalarTypes.set("JSON", z.any());
  scalarTypes.set("String", z.string());
  const type =
    scalarTypes.get(field.type)?.clone() ||
    enums.find((e) => e.name === field.type)?.zodType ||
    z.any();
  if (field.isList) {
    return z.array(type);
  }
  if (field.isRequired) {
    return type;
  }
  return type.optional();
}

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
  form: {
    models: [],
    enums: [],
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
        form: datamodelToPrismaForm(datamodel),
      };
      return schema;
    },
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
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

export function datamodelToXyflow(datamodel: Prisma.DMMF.Datamodel): {
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

export function datamodelToPrismaForm(
  datamodel: Prisma.DMMF.Datamodel
): PrismaForm {
  const enums = datamodelToPrismaFormEnums(datamodel);
  return {
    enums,
    models: datamodelToPrismaFormModel(datamodel, enums),
  };
}

export function datamodelToPrismaFormEnums(
  datamodel: Prisma.DMMF.Datamodel
): FormEnum[] {
  return datamodel.enums.map((enumItem) => {
    return {
      name: enumItem.name,
      props: enumItem,
      zodType: z.enum(
        enumItem.values.map((value) => value.name) as [string, ...string[]]
      ),
      meta: {},
    };
  });
}
