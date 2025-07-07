"use client";

import { FieldRoot, FieldRootProps } from "../field-scalars/field-root";

export type FieldListAutoProps = FieldRootProps;

export function FieldListAuto(props: FieldListAutoProps) {
  return <FieldRoot {...props} />;
}
