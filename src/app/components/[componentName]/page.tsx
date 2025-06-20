import React from "react";
import { registryDocs } from "../../../../registry/registryDocs";
import { CodeDocs } from "@/components/code-docs/code-docs";

type Props = {
  params: Promise<{ componentName: string }>;
  searchParams: Promise<{
    componentName: string | string[] | undefined;
  }>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const { componentName } = params;
  const docs = registryDocs[componentName];
  if (!docs) {
    return <div>Component not found</div>;
  }
  return (
    <div>
      <CodeDocs {...docs} />
    </div>
  );
}
