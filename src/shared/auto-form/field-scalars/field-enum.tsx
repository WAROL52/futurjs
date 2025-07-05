"use client";

import { FieldRoot, FieldRootProps } from "./field-root";

export type FieldEnumProps = FieldRootProps;

export function FieldEnum(props: FieldEnumProps) {
  return <FieldRoot {...props} />;
}
