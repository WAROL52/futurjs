"use client";

import { FieldRoot, FieldRootProps } from "./field-root";

export type FieldBytesProps = FieldRootProps;

export function FieldBytes(props: FieldBytesProps) {
  return <FieldRoot {...props} />;
}
