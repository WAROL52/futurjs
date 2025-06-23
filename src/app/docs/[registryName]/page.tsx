import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getRegistry } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  params: Promise<{ registryName: string }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const registry = getRegistry(params.registryName);
  if (!registry) {
    return <div>Registry not found</div>;
  }
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Object.values(registry.packages).map((pkg) => (
        <Link key={pkg.name} href={`/docs${pkg.url}`}>
          <Card>
            <CardHeader>
              <h2>{pkg.name}</h2>
            </CardHeader>
            <CardContent>
              <p>{pkg.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
