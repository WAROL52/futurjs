"use client";

import { FieldRoot, FieldRootProps } from "./field-root";

export type FieldBooleanProps = FieldRootProps;

export function FieldBoolean(props: FieldBooleanProps) {
  return <FieldRoot {...props} />;
}
