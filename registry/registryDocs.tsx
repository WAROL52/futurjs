import { CodeDocsProps } from "@/components/code-docs/code-docs";
import { helloWorldDoc } from "./docs/hello-world";
import { complexComponentDoc } from "./docs/complex-component";

export const registryDocs: Record<string, CodeDocsProps> = {
  "hello-world": helloWorldDoc,
  "complex-component": complexComponentDoc,
};
