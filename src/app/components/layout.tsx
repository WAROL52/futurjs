import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { registryDocs } from "../../../registry/registryDocs";
import Link from "next/link";

export default function ComponentDocumentation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20">
              <Card className="h-[85vh]">
                <CardHeader>
                  <CardTitle className="text-lg">Navigation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm text-muted-foreground">
                      COMPOSANTS
                    </h4>
                    <nav className="space-y-1">
                      {Object.entries(registryDocs).map(
                        ([componentName, doc]) => (
                          <Link
                            key={doc.title}
                            href={`/components/${componentName}`}
                            className="block text-sm hover:text-primary transition-colors"
                          >
                            {doc.title}
                          </Link>
                        )
                      )}
                    </nav>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
