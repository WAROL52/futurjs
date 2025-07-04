import { REGISTRY_BUILD } from "@/generated/registry/registry";
import { BASE_URL, getAllCodeDocs, normalizePath } from "@/lib/utils";
import { CodeDocType, CodeView, RegistryBuild } from "@/types";
import { writeFileSync } from "fs";
import { Registry, RegistryItem } from "shadcn/registry";

function createItemsDoc(doc: CodeDocType): RegistryItem {
  return {
    name: doc.name,
    title: doc.title,
    description: doc.description,
    type: doc.registryType,
    dependencies: doc.dependencies,
    registryDependencies: [
      ...doc.shadcnDependencies,
      ...doc.registryDependencies.map((dep) => {
        return `${BASE_URL}/r/${dep}.json`;
      }),
    ],
    files: [
      {
        path: "src/" + doc.filePath.split("/").slice(1).join("/"),
        type: doc.registryType,
        target: doc.target.replace("@/", ""),
      },
    ],
  };
}
type ItemExample = {
  name: string;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  codes: CodeView[];
};
function createItemsExample(exemple: ItemExample): RegistryItem {
  const { codes, ...rest } = exemple;
  return {
    ...rest,
    type: "registry:example",
    files: codes.map((code) => ({
      type: "registry:example",
      path: code.path,
      target: normalizePath(code.path),
    })),
  };
}

function normalizeRegistry(build: RegistryBuild): Registry {
  console.log("Normalizing registry...");
  const allCodeDocs = getAllCodeDocs();
  const exemples: ItemExample[] = allCodeDocs
    .filter((doc) => Object.keys(doc.exemples).length)
    .map((doc) => {
      return Object.entries(doc.exemples).map(([name, codes]) => {
        return {
          name: name,
          title: name,
          description: "",
          dependencies: [],
          registryDependencies: [doc.registryUrl],
          codes,
        };
      });
    })
    .flat();
  const demos: ItemExample[] = allCodeDocs
    .filter((doc) => doc.demo.length)
    .map((doc) => {
      return {
        name: `${doc.name}-demo`,
        title: `${doc.name}-demo`,
        description: "",
        dependencies: [],
        registryDependencies: [doc.registryUrl],
        codes: doc.demo,
      };
    });
  return {
    name: "futurejs",
    homepage: BASE_URL,
    items: [
      ...allCodeDocs.map(createItemsDoc),
      ...demos.map(createItemsExample),
      ...exemples.map(createItemsExample),
    ],
  };
}

function main() {
  const reg = normalizeRegistry(REGISTRY_BUILD);
  writeFileSync("../../registry.json", JSON.stringify(reg, null, 2));
  console.log("Registry build completed successfully!");
  console.log("You can now use the registry.json file in your project.");
}
main();
