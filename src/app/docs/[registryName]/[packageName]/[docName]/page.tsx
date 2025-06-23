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
      <h1>Page</h1>
      <pre>Params: {JSON.stringify(params, null, 2)}</pre>
      <pre>Search Params: {JSON.stringify(searchParams, null, 2)}</pre>
      <pre>
        doc:{" "}
        {JSON.stringify(
          getCodeDoc({
            registryName: params.registryName,
            packageName: params.packageName,
            docName: params.docName,
          }),
          null,
          2
        )}
      </pre>
      <CodeDocs {...codeDoc} />
      <footer>Footer content here</footer>
    </div>
  );
}
