export type CodeView = {
  title: string;
  description: string;
  props: Record<string, any>;
  language: string;
  content: string;
  filename: string;
  path: string;
};

export type CodeDocType = {
  title: string;
  description: string;
  props: Record<string, any>;
  url: string;
  fileName: string;
  filePath: string;
  name: string;
  registryUrl: string;
  componentName: string;
  codes: Array<CodeView>;
  exemples: Array<CodeView>;
  target: string;
  dependencies: string[];
  registryDependencies: string[];
  registryType:
    | "registry:block"
    | "registry:component"
    | "registry:lib"
    | "registry:hook"
    | "registry:ui"
    | "registry:page"
    | "registry:file"
    | "registry:style"
    | "registry:theme";
  content: string;
};

export type RegistryPackage = {
  name: string;
  description: string;
  url: string;
  codeDocs: CodeDocType[];
};

export type RegistryFig = {
  name: string;
  description: string;
  packages: Record<string, RegistryPackage>;
  url: string;
};

export type RegistryBuild = Record<string, RegistryFig>;
export type PreviewComponents = Record<
  string,
  (() => Promise<{ default: React.ComponentType }>) | undefined
>;
