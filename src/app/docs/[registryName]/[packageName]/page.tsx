import { getPackage } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  params: Promise<{ packageName: string; registryName: string }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { packageName, registryName } = params;
  const pack = getPackage({ packageName, registryName });
  if (!pack) {
    return <div>Package not found</div>;
  }
  if (!pack.codeDocs || pack.codeDocs.length === 0) {
    return <div>No code documentation available for this package.</div>;
  }
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pack.codeDocs.map((component) => {
        return (
          <div
            key={component.name}
            className="p-4 m-2 border rounded shadow-lg"
          >
            <h2 className="text-xl font-bold">{component.title}</h2>
            <p>{component.description}</p>
            <Link
              href={`/docs${component.url}`}
              className="text-blue-500 hover:underline"
            >
              View Documentation
            </Link>
          </div>
        );
      })}
    </div>
  );
}
