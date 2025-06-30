import { FileViewer } from "@/components/code-docs/file-viewer";
import { CodeView } from "@/types";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CodeViewer } from "@/components/code-docs/code-viewer";
type Props = {
  params: Promise<{ file: string }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

const codes: CodeView[] = [
  {
    language: "tsx",
    filename: "app.ts",
    content: "const example = 'Hello, world!';",
    path: "src/app.ts",
    title: "App",
    description: "This is an example app file.",
    props: {},
  },
  {
    language: "javascript",
    filename: "index.js",
    content:
      "import express from 'express';\nconst app = express();\n\napp.listen(3000, () => console.log('Server running'));",
    path: "src/index.js",
    title: "Server Entry Point",
    description: "Express server initialization file.",
    props: {},
  },
  {
    language: "css",
    filename: "styles.css",
    content:
      "body {\n  font-family: 'Arial', sans-serif;\n  margin: 0;\n  padding: 0;\n  background-color: #f5f5f5;\n}",
    path: "src/styles.css",
    title: "Main Stylesheet",
    description: "Global CSS styles for the application.",
    props: {},
  },
  {
    language: "json",
    filename: "package.json",
    content:
      '{\n  "name": "example-project",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.0.0",\n    "next": "^13.0.0"\n  }\n}',
    path: "package.json",
    title: "Package Configuration",
    description: "NPM package configuration file.",
    props: {},
  },
];

export default async function Page(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  return (
    <div className="bg-muted w-full  py-50 ">
      <div className="container mx-auto  bg-background/50 p-8 rounded-md">
        <FileViewer codes={codes} />
      </div>
    </div>
  );
}
