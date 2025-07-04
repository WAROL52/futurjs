"use client";

import { CodeSnippet } from "./code-snippet";

export type CodeSnippetInstallProps = {
  dependencies: string[];
};

export function CodeSnippetInstall({ dependencies }: CodeSnippetInstallProps) {
  if (!dependencies.length) return null;
  return (
    <CodeSnippet
      commands={[
        {
          label: "npm",
          // icon: BoxIcon,
          code: "npm install " + dependencies.join(" "),
        },
        {
          label: "yarn",
          // icon: BoxIcon,
          code: "yarn add " + dependencies.join(" "),
        },
        {
          label: "pnpm",
          // icon: BoxIcon,
          code: "pnpm add " + dependencies.join(" "),
        },
        {
          label: "bun",
          // icon: BoxIcon,
          code: "bun add " + dependencies.join(" "),
        },
      ]}
    />
  );
}
