import { CodeDocsProps } from "@/components/code-docs/code-docs";
import { Category, registryUrl } from "@/lib/utils";

export const complexComponentDoc: CodeDocsProps = {
  title: "Complex Component",
  description: "A complex component that demonstrates advanced features.",
  codes: [
    {
      code: "<ComplexComponent prop1={value1} prop2={value2} />",
      filename: "ComplexComponentExample.tsx",
      language: "tsx",
    },
  ],
  installation: registryUrl({ componentName: "complex-component" }),
  PreviewComponent: () => <div>Complex Component Preview</div>,
  category: Category.Basic,
  tags: ["advanced", "complex", "example"],
};
