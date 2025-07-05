"use client";

import { FieldRoot, FieldRootProps } from "./field-root";

// big int
// int
// float
// decimal
export type FieldNumberProps = FieldRootProps;

export function FieldNumber(props: FieldNumberProps) {
  return <FieldRoot {...props} />;
}
