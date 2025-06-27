import { BASE_URL } from "@/lib/utils";
import { RegistryBuild } from "@/types";
import { Registry, RegistryItem } from "shadcn/registry";

function normalizeRegistry(build: RegistryBuild): Registry {
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
                description: doc.description,
                type: "registry:component",
              } as RegistryItem;
            });
          })
          .flat();
        return i;
      })
      .flat(),
  };
}
