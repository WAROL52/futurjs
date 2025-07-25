"use client";

import { CodeSnippet } from "./code-snippet";

export type CodeSnippetRegistryInstallProps = {
  dependencies: string[];
};

export function CodeSnippetRegistryInstall({
  dependencies,
}: CodeSnippetRegistryInstallProps) {
  if (!dependencies.length) return null;
  return (
    <CodeSnippet
      commands={[
        {
          label: "npm",
          // icon: BoxIcon,
          code: "npx shadcn@latest add " + dependencies.join(" "),
        },
        {
          label: "yarn",
          // icon: BoxIcon,
          code: "yarn shadcn@latest add " + dependencies.join(" "),
        },
        {
          label: "pnpm",
          // icon: BoxIcon,
          code: "pnpm dlx shadcn@latest add " + dependencies.join(" "),
        },
        {
          label: "bun",
          // icon: BoxIcon,
          code: "bunx --bun shadcn@latest add " + dependencies.join(" "),
        },
      ]}
    />
  );
}
