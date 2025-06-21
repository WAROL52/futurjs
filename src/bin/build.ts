import { CodeDocsProps } from "@/components/code-docs/code-docs";
import { BASE_URL } from "@/lib/utils";
import { consola, createConsola } from "consola";
import { readFile, readdirSync, writeFileSync } from "fs";

export type RegistryDocs = {
  url: string;
  codeDocs: CodeDocsProps[];
};

export const RegistryPackageNames = [
  "actions",
  "blocks",
  "components",
  "hooks",
  "lib",
  "pages",
  "types",
] as const;
export type RegistryPackageName = (typeof RegistryPackageNames)[number];

export type RegistryPackage = Record<
  RegistryPackageName,
  RegistryDocs | null
> & {
  url: string;
};
export type RegistryBuild = Record<string, RegistryPackage | null>;

export const REGISTRY_DIR_PATH = "registry";

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
    consola.error("Error reading registry directory:", error);
  }
  return dirNames;
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
    consola.error("Error reading registry directory:", error);
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
        const { codeDocs } = await import("../../" + filePath);
        if (!codeDocs) {
          return null;
        }
        const namebase = fileName.split(".")[0];
        return {
          ...codeDocs,
          url: `${BASE_URL}/${name}/${namebase}`,
          fileName,
          filePath,
          name: namebase,
          registry: `${BASE_URL}/registry/${namebase}`,
        };
      })
    )
  ).filter((e) => e);
}
async function getRegistryPackage(
  name: string,
  path: string
): Promise<RegistryPackage | null> {
  const dirNames = getListDirName(path);
  if (dirNames.length === 0) {
    return null;
  }

  return {
    ...Object.fromEntries(
      (
        await Promise.all(
          dirNames.map(async (dirName) => {
            const codeDocs = await getCodeDocs(dirName, `${path}/${dirName}`);
            if (codeDocs) {
              codeDocs.forEach((doc) => {
                doc.url = `${BASE_URL}/${name}/${dirName}/${doc.name}`;
              });
            }
            return [
              dirName,
              {
                url: `${BASE_URL}/${name}/${dirName}`,
                codeDocs: codeDocs,
              },
            ] as [string, RegistryDocs | null];
          })
        )
      ).filter(([_dirName, docs]) => !!docs?.codeDocs) // Filter out null values
    ),
    url: `${BASE_URL}/${name}`,
  } as unknown as RegistryPackage;
}

async function buildRegistry() {
  consola.start("Building project...");

  const build = Object.fromEntries(
    (
      await Promise.all(
        getRegistryDirNames().map(async (name) => [
          name,
          await getRegistryPackage(name, `${REGISTRY_DIR_PATH}/${name}`),
        ])
      )
    ).filter(([_name, pkg]) => !!pkg) // Filter out null values
  );

  writeFileSync(
    "src/generated/registry/registry.ts",
    `
export const REGISTRY_BUILD = ${JSON.stringify(build, null, 2)}

	`
  );
  consola.success("Project built!");
}

buildRegistry();
