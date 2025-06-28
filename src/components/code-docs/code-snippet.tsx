"use client";
import {
  Snippet,
  SnippetCopyButton,
  SnippetHeader,
  SnippetTabsContent,
  SnippetTabsList,
  SnippetTabsTrigger,
} from "@/components/ui/kibo-ui/snippet";
import { BoxIcon } from "lucide-react";
import { useState } from "react";

export type CodeSnippetProps = {
  snippet: string;
};

export function CodeSnippet({ snippet }: CodeSnippetProps) {
  const commands = [
    {
      label: "npm",
      // icon: BoxIcon,
      code: "npx shadcn@latest add " + snippet,
    },
    {
      label: "yarn",
      // icon: BoxIcon,
      code: "yarn shadcn@latest add " + snippet,
    },
    {
      label: "pnpm",
      // icon: BoxIcon,
      code: "pnpm dlx shadcn@latest add " + snippet,
    },
    {
      label: "bun",
      // icon: BoxIcon,
      code: "bunx --bun shadcn@latest add " + snippet,
    },
  ];
  const [value, setValue] = useState(commands[0].label);
  const activeCommand = commands.find((command) => command.label === value);
  return (
    <Snippet value={value} onValueChange={setValue}>
      <SnippetHeader className="bg-muted-foreground/10">
        <SnippetTabsList>
          {commands.map((command) => (
            <SnippetTabsTrigger key={command.label} value={command.label}>
              {/* {command?.icon && <command.icon size={14} />} */}
              <span>{command.label}</span>
            </SnippetTabsTrigger>
          ))}
        </SnippetTabsList>
        {activeCommand && (
          <SnippetCopyButton
            value={activeCommand.code}
            onCopy={() =>
              console.log(`Copied "${activeCommand.code}" to clipboard`)
            }
            onError={() =>
              console.error(
                `Failed to copy "${activeCommand.code}" to clipboard`
              )
            }
          />
        )}
      </SnippetHeader>
      {commands.map((command) => (
        <SnippetTabsContent key={command.label} value={command.label}>
          {command.code}
        </SnippetTabsContent>
      ))}
    </Snippet>
  );
}
