"use client";
import { PREVIEW_COMPONENTS } from "@/generated/registry/preview-components";
import dynamic from "next/dynamic";
import React, { Suspense, useEffect, useState } from "react";

export type PreviewerProps = {
	path?:string
};

export function Previewer({path}: PreviewerProps) {
	if(!path) {
		return null
	}
  return <DynamicComponent path={path} />;
}

function DynamicComponent({ path }: {path:string}) {

   const moduleImport =  PREVIEW_COMPONENTS[path];
   if(!moduleImport) 
	 return <div className="text-destructive font-mono ">Component not found for path: {path}</div>;
	  const PreviewComponent = dynamic(moduleImport, {ssr: false});
  return (
    <div>
		<Suspense fallback={<div>Loading ...</div>}>
	  		<PreviewComponent />
		</Suspense>
    </div>
  );
};