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
  commands: {
    label: string;
    code: string;
  }[];
};

export function CodeSnippet({ commands }: CodeSnippetProps) {
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
