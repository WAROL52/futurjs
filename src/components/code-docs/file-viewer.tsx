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

export type FileViewerProps = {
  codes: CodeView[];
};

export function FileViewer({ codes }: FileViewerProps) {
  const { isMobile, width } = useResponsive();
  const [active, setActive] = useState(0);
  return (
    <div className="border p-1 rounded-lg py-4 bg-background">
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
    </div>
  );
}
