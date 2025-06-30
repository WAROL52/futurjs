import { CodeDocsProps } from "@/components/code-docs/code-docs";
import { REGISTRY_BUILD } from "@/generated/registry/registry";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const BASE_URL = "https://futurjs.vercel.app";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createCodeDoc(props: CodeDocsProps) {
  return props;
}

export function registryUrl(params: { componentName: string }) {
  const baseUrl = `${BASE_URL}/registry`;
  return `npx shadcn@latest add ${baseUrl}/${params.componentName}`;
}

export const Category = {
  Prisma: "Prisma",
  Basic: "Basic",
  Auth: "Auth",
  Layout: "Layout",
  Form: "Form",
  List: "List",
  Table: "Table",
  Navigation: "Navigation",
} as const;
export type CategoryType = keyof typeof Category;

export type RegistryDoc = Record<string, CodeDocsProps>;

export function getRegistry(name: string) {
  if (name in REGISTRY_BUILD) return REGISTRY_BUILD[name];
  return null;
}

export function getPackage(params: {
  registryName: string;
  packageName: string;
}) {
  const registry = getRegistry(params.registryName);
  if (!registry) return null;

  return registry.packages[params.packageName] || null;
}
export function getCodeDoc(params: {
  registryName: string;
  packageName: string;
  docName: string;
}) {
  const pkg = getPackage({
    registryName: params.registryName,
    packageName: params.packageName,
  });
  if (!pkg) return null;

  return pkg.codeDocs.find((doc) => doc.name === params.docName) || null;
}
export function getAllCodeDocs(): CodeDocsProps[] {
  return Object.values(REGISTRY_BUILD)
    .map((reg) =>
      Object.values(reg.packages)
        .map((pkg) => pkg.codeDocs)
        .flat()
    )
    .flat();
}

export function getUrlRegistryDependencies(name: string) {
  const codeDocs = getAllCodeDocs();
  const doc = codeDocs.find((doc) => doc.name === name);
  if (!doc) return null;
  return doc.url;
}

export function getUrlRegistryNeeds(name: string) {
  return getAllCodeDocs()
    .filter((doc) => doc.registryDependencies.includes(name))
    .map((doc) => {
      return {
        name: doc.name,
        url: doc.url,
        title: doc.title,
        description: doc.description,
        registryDependencies: doc.registryDependencies,
      };
    });
}
