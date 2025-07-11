"use client";

import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
  CodeBlockSelect,
  CodeBlockSelectContent,
  CodeBlockSelectItem,
  CodeBlockSelectTrigger,
  CodeBlockSelectValue,
} from "@/components/ui/kibo-ui/code-block";
import type { BundledLanguage } from "@/components/ui/kibo-ui/code-block";
import { normalizePath } from "@/lib/utils";
import { CodeView } from "@/types";
import { Card } from "../ui/card";

export type CodeViewerProps = {
  codes: CodeView[];
};

export function CodeViewer({ codes }: CodeViewerProps) {
  if (!codes || codes.length === 0) {
    return (
      <CodeViewer
        codes={[
          {
            content: "// 404 not found!",
            description: "",
            filename: "not_found.tsx",
            language: "tsx",
            path: "not_found.tsx",
            props: {},
            title: "404",
          },
        ]}
      />
    );
  }

  return (
    <CodeBlock
      data={codes.map((c) => ({
        language: c.language,
        filename: normalizePath(c.path),
        code: c.content,
      }))}
      value={codes[0].language}
    >
      <CodeBlockHeader>
        <CodeBlockFiles>
          {(item) => (
            <CodeBlockFilename key={item.language} value={item.language}>
              {item.filename}
            </CodeBlockFilename>
          )}
        </CodeBlockFiles>
        <CodeBlockSelect>
          <CodeBlockSelectTrigger>
            <CodeBlockSelectValue />
          </CodeBlockSelectTrigger>
          <CodeBlockSelectContent>
            {(item) => (
              <CodeBlockSelectItem key={item.language} value={item.language}>
                {item.language}
              </CodeBlockSelectItem>
            )}
          </CodeBlockSelectContent>
        </CodeBlockSelect>
        <CodeBlockCopyButton
          onCopy={() => console.log("Copied code to clipboard")}
          onError={() => console.error("Failed to copy code to clipboard")}
        />
      </CodeBlockHeader>
      <CodeBlockBody>
        {(item) => (
          <CodeBlockItem key={item.language} value={item.language}>
            <CodeBlockContent language={item.language as BundledLanguage}>
              {item.code}
            </CodeBlockContent>
          </CodeBlockItem>
        )}
      </CodeBlockBody>
    </CodeBlock>
  );
}
