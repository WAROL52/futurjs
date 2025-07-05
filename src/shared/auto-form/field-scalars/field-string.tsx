"use client";

import { FieldRoot, FieldRootProps } from "./field-root";

// string
// text
// password
// password-create
// email
// url
// json
// otp
// description
export type FieldStringProps = FieldRootProps;

export function FieldString(props: FieldStringProps) {
  return <FieldRoot {...props} />;
}
