"use client";

import { FieldRoot, FieldRootProps } from "./field-root";

// date time
// date
// time
// timestamp
export type FieldDateTimeProps = FieldRootProps;

export function FieldDateTime(props: FieldDateTimeProps) {
  return <FieldRoot {...props} />;
}
