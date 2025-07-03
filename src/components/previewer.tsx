"use client";
import { PREVIEW_COMPONENTS } from "@/generated/registry/preview-components";
import dynamic from "next/dynamic";
import React, { Suspense, useEffect, useState } from "react";

export type PreviewerProps = {
  path?: string;
};
import { useFullscreen } from "@mantine/hooks";
import { Button } from "./ui/button";
export function Previewer({ path }: PreviewerProps) {
  if (!path) {
    return null;
  }
  return <DynamicComponent path={path} />;
}

function DynamicComponent({ path }: { path: string }) {
  const { toggle, fullscreen, ref } = useFullscreen();
  const moduleImport = PREVIEW_COMPONENTS[path];
  if (!moduleImport)
    return (
      <div className="text-destructive font-mono ">
        Component not found for path: {path}
      </div>
    );
  const PreviewComponent = dynamic(moduleImport, { ssr: false });
  return (
    <div ref={ref} className="relative h-full w-full bg-muted/10">
      <div className="flex justify-end p-2">
        <Button onClick={toggle} color={fullscreen ? "red" : "blue"}>
          {fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        </Button>
      </div>
      <Suspense fallback={<div>Loading ...</div>}>
        <PreviewComponent />
      </Suspense>
    </div>
  );
}
