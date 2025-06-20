import React from "react";

type Props = {
  params: Promise<{ layouts: string }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  return (
    <div>
      <h1>Page</h1>
      <pre>Params: {JSON.stringify(params, null, 2)}</pre>
      <pre>Search Params: {JSON.stringify(searchParams, null, 2)}</pre>
      <footer>Footer content here</footer>
    </div>
  );
}
