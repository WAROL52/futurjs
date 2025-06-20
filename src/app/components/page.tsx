import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { registryDocs } from "../../../registry/registryDocs";
import Link from "next/link";

export default function ComponentDocumentation() {
  return (
    // list of components in cards with links to their documentation
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(registryDocs).map(([componentName, doc]) => (
          <Card key={componentName}>
            <CardHeader>
              <CardTitle>{doc.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{doc.description}</p>
              <Link
                href={`/components/${componentName}`}
                className="text-blue-500"
              >
                View Documentation
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
