import { REGISTRY_BUILD } from "@/generated/registry/registry";
import { BASE_URL } from "@/lib/utils";
import { RegistryBuild } from "@/types";
import { writeFileSync } from "fs";
import { Registry, RegistryItem } from "shadcn/registry";

function normalizeRegistry(build: RegistryBuild): Registry {
  console.log("Normalizing registry...");

  return {
    name: "futurejs",
    homepage: BASE_URL,
    items: Object.values(build)
      .map((fig) => {
        const i = Object.values(fig.packages)
          .map((pkg) => {
            return pkg.codeDocs.map((doc) => {
              return {
                name: doc.name,
                title: doc.title,
                description: doc.description,
                type: doc.registryType,
                dependencies: doc.dependencies,
                registryDependencies: doc.registryDependencies,
                files: [
                  {
                    path: "src/" + doc.filePath.split("/").slice(1).join("/"),
                    type: doc.registryType,
                  },
                ],
              } as RegistryItem;
            });
          })
          .flat();
        return i;
      })
      .flat(),
  };
}

function main() {
  const reg = normalizeRegistry(REGISTRY_BUILD);
  writeFileSync("../../registry.json", JSON.stringify(reg, null, 2));
  console.log("Registry build completed successfully!");
  console.log("You can now use the registry.json file in your project.");
}
main();
