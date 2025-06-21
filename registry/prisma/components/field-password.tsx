"use client";

import { createCodeDoc } from "@/lib/utils";

export type FieldPasswordProps = {};

export function FieldPassword({}: FieldPasswordProps) {
  return <div>FieldPassword</div>;
}

export const codeDocs = createCodeDoc({
  title: "Field Password",
  description: "A password input field component.",
  codes: [],
  PreviewComponent() {
    return null;
  },
});
