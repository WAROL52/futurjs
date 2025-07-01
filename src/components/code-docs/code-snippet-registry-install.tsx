"use client";

import { CodeSnippet } from "./code-snippet";

export type CodeSnippetRegistryInstallProps = {
  registryUrl: string;
};

export function CodeSnippetRegistryInstall({
  registryUrl,
}: CodeSnippetRegistryInstallProps) {
  if (!registryUrl) return null;
  return (
    <CodeSnippet
      commands={[
        {
          label: "npm",
          // icon: BoxIcon,
          code: "npx shadcn@latest add " + registryUrl,
        },
        {
          label: "yarn",
          // icon: BoxIcon,
          code: "yarn shadcn@latest add " + registryUrl,
        },
        {
          label: "pnpm",
          // icon: BoxIcon,
          code: "pnpm dlx shadcn@latest add " + registryUrl,
        },
        {
          label: "bun",
          // icon: BoxIcon,
          code: "bunx --bun shadcn@latest add " + registryUrl,
        },
      ]}
    />
  );
}
