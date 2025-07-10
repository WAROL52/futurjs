"use client";

import { FieldRoot, FieldRootProps } from "../field-scalars/field-root";
import { FieldManyToMany } from "./field-many-to-many";
import { FieldManyToOne } from "./field-many-to-one";
import { FieldOneToMany } from "./field-one-to-many";
import { FieldOneToOne } from "./field-one-to-one";

export type FieldRelationalAutoProps = FieldRootProps;

export function FieldRelationalAuto(props: FieldRelationalAutoProps) {
  const { fieldSchema } = props;
  if (fieldSchema.relationType === "oneToMany")
    return <FieldOneToMany {...props} />;
  if (fieldSchema.relationType === "manyToOne")
    return <FieldManyToOne {...props} />;
  if (fieldSchema.relationType === "manyToMany")
    return <FieldManyToMany {...props} />;
  if (fieldSchema.relationType === "oneToOne")
    return <FieldOneToOne {...props} />;
  return <FieldRoot {...props} />;
}
