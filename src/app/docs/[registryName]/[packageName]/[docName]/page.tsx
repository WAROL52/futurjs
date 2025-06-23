import { CodeDocs } from "@/components/code-docs/code-docs";
import { getCodeDoc } from "@/lib/utils";
import React from "react";

type Props = {
  params: Promise<{
    docName: string;
    packageName: string;
    registryName: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { docName, packageName, registryName } = params;
  const codeDoc = getCodeDoc({
    registryName,
    packageName,
    docName,
  });
  if (!codeDoc) {
    return <div>Code documentation not found.</div>;
  }
  return (
    <div>
      <CodeDocs {...codeDoc} />
    </div>
  );
}
