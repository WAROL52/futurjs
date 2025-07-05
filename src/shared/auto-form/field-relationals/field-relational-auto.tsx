"use client";

import { FieldRoot, FieldRootProps } from "../field-scalars/field-root";

export type FieldRelationalAutoProps = FieldRootProps;

export function FieldRelationalAuto(props: FieldRelationalAutoProps) {
  return <FieldRoot {...props} />;
}
