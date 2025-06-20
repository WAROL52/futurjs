import { CodeDocsProps } from "@/components/code-docs/code-docs";
import { HelloWorld } from "../new-york/hello-world/hello-world";
import { Category, registryUrl } from "@/lib/utils";

export const helloWorldDoc: CodeDocsProps = {
  title: "Hello World",
  description: "A simple Hello World component.",
  codes: [
    {
      code: "<HelloWorld />",
      language: "tsx",
      filename: "HelloWorldExample.tsx",
    },
  ],
  installation: registryUrl({ componentName: "hello-world" }),
  PreviewComponent: () => <HelloWorld />,
  category: Category.Basic,
};
