"use client";

import { FieldRoot, FieldRootProps } from "./field-root";

// range date time
// range date
// range time
// range timestamp
// range int
// range float
// range decimal
// range big int
export type FieldRangeProps = FieldRootProps;

export function FieldRange(props: FieldRangeProps) {
  return <FieldRoot {...props} />;
}
