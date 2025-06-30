import { CodeDocsProps } from "@/components/code-docs/code-docs";
import { BASE_URL, normalizePath } from "@/lib/utils";
import { consola, createConsola } from "consola";
import { readFile, readFileSync, readdirSync, writeFileSync } from "fs";
import { get } from "http";

export const REGISTRY_DIR_PATH = "../registry";
export const EXAMPLE_DIR_PATH = "../_exemples";
const PREVIEW_COMPONENTS: Record<string, string> = {};

function getListDirName(path: string) {
  const dirNames: string[] = [];

  try {
    const files = readdirSync(path, { withFileTypes: true });
    for (const file of files) {
      if (file.isDirectory()) {
        dirNames.push(file.name);
      }
    }
  } catch (error) {
    return [];
  }
  return dirNames;
}

function getFileContent(path: string) {
  return readFileSync(path, { encoding: "utf-8" });
}

function fileExists(path: string) {
  try {
    return !!readFileSync(path, { encoding: "utf-8" });
  } catch {
    return false;
  }
}

async function getCodeSource(params: { filename: string; namebase: string }) {
  const { filename, namebase } = params;
  const path = `${EXAMPLE_DIR_PATH}/${namebase}/${filename}`;
  if (!fileExists(path)) return [];
  const { default: Component } = await import(path);
  if (typeof Component !== "function") {
    return [];
  }
  PREVIEW_COMPONENTS[path] = `() => import("../${path
    .split(".")
    .slice(0, -1)
    .join(".")}")`;
  return [
    {
      title: Component.title || Component.name || namebase,
      description: Component.description || "",
      props: Component.props || {},
      language: filename.split(".").pop() || "txt",
      content: getFileContent(path),
      filename,
      path,
    },
  ];
}

async function getExemples(basename: string) {
  const path = `${EXAMPLE_DIR_PATH}/${basename}`;
  const fileNames = getListFileName(path, [".tsx", ".ts"]).filter(
    (fileName) => fileName !== "preview.tsx"
  );
  return (
    await Promise.all(
      fileNames.map((fileName) =>
        getCodeSource({ filename: fileName, namebase: basename })
      )
    )
  ).flat();
}

function getListFileName(path: string, ext: string[]): string[] {
  const fileNames: string[] = [];
  try {
    const files = readdirSync(path, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        fileNames.push(file.name);
      }
    }
  } catch (error) {
    return [];
  }

  return fileNames.filter((fileName) => {
    return ext.some((e) => fileName.endsWith(e));
  });
}
function getRegistryDirNames(): string[] {
  return getListDirName(REGISTRY_DIR_PATH);
}
async function getCodeDocs(name: string, path: string) {
  const fileNames = getListFileName(path, [".tsx", ".ts"]);
  if (fileNames.length === 0) {
    return null;
  }
  return (
    await Promise.all(
      fileNames.map(async (fileName) => {
        const filePath = `${path}/${fileName}`;

        const rest = await import(filePath);

        const namebase = fileName.split(".")[0];
        const componentName = namebase
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join("");
        const libName = componentName[0].toLowerCase() + componentName.slice(1);
        const component = rest[componentName] || rest[libName];

        if (typeof component != "function") {
          return null;
        }

        return {
          title: component.title || componentName,
          description: component.description || "",
          props: component.props || {},
          url: `/${name}/${namebase}`,
          fileName,
          filePath,
          name: namebase,
          registry: `${BASE_URL}/r/${namebase}.json`,
          componentName,
          codes: await getCodeSource({ filename: "preview.tsx", namebase }),
          exemples: await getExemples(namebase),
          target: component.target || normalizePath(filePath),
          dependencies: component.dependencies || [],
          registryDependencies: component.registryDependencies || [],
          registryType: "registry:component",
          content: readFileSync(filePath, { encoding: "utf-8" }),
        };
      })
    )
  ).filter((e) => e);
}
async function getRegistryPackage(name: string, path: string) {
  const dirNames = getListDirName(path);
  if (dirNames.length === 0) {
    return null;
  }

  return {
    name,
    description: "",
    packages: Object.fromEntries(
      (
        await Promise.all(
          dirNames.map(async (dirName) => {
            const codeDocs = await getCodeDocs(dirName, `${path}/${dirName}`);
            if (!codeDocs)
              return [dirName, null] as [
                string,
                { url: string; codeDocs: typeof codeDocs } | null
              ];
            if (codeDocs) {
              codeDocs.forEach((doc) => {
                doc!.url = `/${name}/${dirName}/${doc!.name}`;
              });
            }
            return [
              dirName,
              {
                name: dirName,
                description: "",
                url: `/${name}/${dirName}`,
                codeDocs: codeDocs,
              },
            ] as [
              string,
              {
                name: string;
                description: string;
                url: string;
                codeDocs: typeof codeDocs;
              } | null
            ];
          })
        )
      ).filter(([_dirName, docs]) => docs && !!docs?.codeDocs) // Filter out null values
    ),
    url: `/${name}`,
  };
}

function genPreviewComponentFile() {
  const txt = Object.entries(PREVIEW_COMPONENTS)
    .map(([path, importFn]) => `\t"${path}":${importFn}`)
    .join(",\n");
  const fileContent = `
import { PreviewComponents } from "@/types";

export const PREVIEW_COMPONENTS: PreviewComponents = {
${txt}
};
`;
  writeFileSync("../generated/registry/preview-components.tsx", fileContent);
  consola.success("Preview components file generated!");
}

async function buildRegistry() {
  consola.start("Building project...");

  const build = Object.fromEntries(
    (
      await Promise.all(
        getRegistryDirNames().map(async (name) => {
          return [
            name,
            await getRegistryPackage(name, `${REGISTRY_DIR_PATH}/${name}`),
          ];
        })
      )
    ).filter(([_name, pkg]) => !!pkg) // Filter out null values
  );

  writeFileSync(
    "../generated/registry/registry.ts",
    `
import { RegistryBuild } from "@/types";

export const REGISTRY_BUILD: RegistryBuild = ${JSON.stringify(build, null, 2)}

	`
  );
  genPreviewComponentFile();
  consola.success("Project built!");
}

buildRegistry();
