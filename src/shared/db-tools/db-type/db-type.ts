import { Edge } from "@xyflow/react";
import { ZodType } from "zod/v4";

export type DbFieldMeta = {};

export type DbEnumMeta = {};

export type DbModelMeta = {};

export type DbFieldKind = "scalar" | "object" | "enum" | "unsupported";
export type DbFieldDefault = {
  name: string;
  args: Array<string | number>;
};

export type DbFieldDefaultScalar = string | boolean | number;
export type DbFieldProps = {
  kind: DbFieldKind;
  name: string;
  isRequired: boolean;
  isList: boolean;
  isUnique: boolean;
  isId: boolean;
  isReadOnly: boolean;
  isGenerated?: boolean;
  isUpdatedAt?: boolean;
  /**
   * Describes the data type in the same the way it is defined in the Prisma schema:
   * BigInt, Boolean, Bytes, DateTime, Decimal, Float, Int, JSON, String, $ModelName
   */
  type: string;
  /**
   * Native database type, if specified.
   * For example, `@db.VarChar(191)` is encoded as `['VarChar', ['191']]`,
   * `@db.Text` is encoded as `['Text', []]`.
   */
  nativeType?: [string, string[]] | null;
  dbName?: string | null;
  hasDefaultValue: boolean;
  default?: DbFieldDefault | DbFieldDefaultScalar | DbFieldDefaultScalar[];
  relationFromFields?: string[];
  relationToFields?: string[];
  relationOnDelete?: string;
  relationOnUpdate?: string;
  relationName?: string;
  documentation?: string;
};
export type DbEnumProps = {};

export type DbFieldEnum = {
  name: string;
  values: string[];
  meta: Partial<DbEnumMeta>;
  props: DbEnumProps;
  zodType: ZodType<any, any, any>;
};

export type DbField = {
  name: string;
  meta: Partial<DbFieldMeta>;
  props: DbFieldProps;
  zodType: ZodType<any, any, any>;
};

export type DbModel = {
  name: string;
  meta: Partial<DbModelMeta>;
  fields: DbField[];
};

export type DbSchema = {
  models: DbModel[];
  enums: DbFieldEnum[];
  xyflow: DbXyflow;
};

export type DbXyflow = {
  nodes: Node[];
  edges: Edge[];
};
