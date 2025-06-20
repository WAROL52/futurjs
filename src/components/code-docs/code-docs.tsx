import { Code, Eye, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CodeViewer, CodeViewerProps } from "./code-viewer";
import { CodeSnippet } from "./code-snippet";
import { CategoryType } from "@/lib/utils";

export type CodeDocsProps = {
  title: string;
  description: string;
  PreviewComponent: () => React.ReactNode;
  codes: CodeViewerProps["codes"];
  installation?: string;
  properties?: Array<{
    name: string;
    type: string;
    default?: string;
    required?: boolean;
    description: string;
  }>;
  examples?: CodeDocsProps[];
  category?: CategoryType;
  tags?: string[];
};

export function CodeDocs({
  PreviewComponent,
  codes = [],
  properties = [],
  installation = "",
  examples = [],
  title,
  description,
}: CodeDocsProps) {
  return (
    <section id="button" className="space-y-6 mb-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList>
          <TabsTrigger value="preview">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="code">
            <Code className="h-4 w-4 mr-2" />
            Code
          </TabsTrigger>
          {properties.length > 0 && (
            <TabsTrigger value="props">
              <Settings className="h-4 w-4 mr-2" />
              Props
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardContent className="space-y-4">
              {<PreviewComponent />}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code">
          <Card>
            <CardContent className="space-y-4">
              <CodeViewer codes={codes} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="props">
          <Card>
            <CardHeader>
              <CardTitle>Props</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((prop) => (
                    <TableRow key={prop.name}>
                      <TableCell className="font-mono">
                        {prop.name} {!prop.required && "?"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{prop.type}</Badge>
                      </TableCell>
                      <TableCell>{prop.default || "-"}</TableCell>
                      <TableCell>{prop.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* installation */}
      {installation && (
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Installation</h3>
          <p className="text-muted-foreground">
            For this component to work, you need to install the UI library.
          </p>
          <CodeSnippet snippet={installation} />
        </div>
      )}

      {/* exemples */}
      {examples && examples.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Exemples</h3>
          <p className="text-muted-foreground">
            This is an example of how to use this component.
          </p>
          {examples.map((example, index) => (
            <Card key={index} className="mb-8 bg-background">
              <CardContent>
                <CodeDocs {...example} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
