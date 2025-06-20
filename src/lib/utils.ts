import { CodeDocsProps } from "@/components/code-docs/code-docs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createCodeDoc(props: CodeDocsProps) {
  return props;
}

export function registryUrl(params: { componentName: string }) {
  const baseUrl = "https://futurjs.vercel.app/registry";
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
