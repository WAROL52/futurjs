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
import { CodeDocType, CodeView } from "@/types";
import { PropsWithChildren } from "react";
import { Previewer } from "../previewer";

export type CodeDocsProps = PropsWithChildren<CodeDocType>;

export function CodeDocs({
  children,
  title,
  description,
  codes,
  props,
  componentName,
  registry,
  exemples,
}: CodeDocsProps) {
  const properties = Object.entries(props || {}).map(([name, prop]) => ({
    name,
    type: prop.type || "unknown",
    default: prop.default || "-",
    description: prop.description || "-",
    required: prop.required || false,
  }));
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
              <Previewer path={codes.at(0)?.path} />
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
      {registry && (
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Installation</h3>
          <p className="text-muted-foreground">
            For this component to work, you need to install the UI library.
          </p>
          <CodeSnippet snippet={registry} />
        </div>
      )}

      {/* exemples */}
      {exemples && exemples.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Exemples</h3>
          <p className="text-muted-foreground">
            This is an example of how to use this component.
          </p>
          {exemples.map((example, index) => (
            <Card key={index} className="mb-8 bg-background">
              <CardContent>
                <CodeExample code={example} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

function CodeExample({ code }: { code: CodeView }) {
  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{code.title}</h2>
        <p className="text-muted-foreground mt-2">{code.description}</p>
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
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardContent className="space-y-4">
              <Previewer path={code.path} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code">
          <Card>
            <CardContent className="space-y-4">
              <CodeViewer codes={[code]} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
