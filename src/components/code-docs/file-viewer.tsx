"use client";

import { CodeView } from "@/types";
import { FileTree } from "./file-tree";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { CodeViewer } from "./code-viewer";
import { useResponsive } from "@/hooks/use-responsive";
import { useState } from "react";
import { CodeSnippetRegistryInstall } from "./code-snippet-registry-install";

export type FileViewerProps = {
  codes: CodeView[];
  registryUrl?: string;
};

export function FileViewer({ codes, registryUrl }: FileViewerProps) {
  const { isMobile, width } = useResponsive();
  const [active, setActive] = useState(0);
  if (codes.length <= 1) return <CodeViewer codes={codes} />;
  return (
    <div className="border p-1 rounded-lg  bg-background">
      <span className="hidden">
        {width}-{active}
      </span>
      <ResizablePanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        className="min-h-[500px] md:min-w-full"
      >
        <ResizablePanel defaultSize={20}>
          <div className="">
            <FileTree codes={codes} active={active} setActive={setActive} />
          </div>
        </ResizablePanel>
        <ResizableHandle className="mx-2" withHandle />
        <ResizablePanel>
          <CodeViewer codes={codes[active] ? [codes[active]] : []} />
        </ResizablePanel>
      </ResizablePanelGroup>
      <div className="mt-1">
        {registryUrl && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Install the following registry dependencies:
            </p>
            <CodeSnippetRegistryInstall dependencies={[registryUrl]} />
          </div>
        )}
      </div>
    </div>
  );
}
