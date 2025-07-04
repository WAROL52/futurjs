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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CodeViewer, CodeViewerProps } from "./code-viewer";
import { CodeSnippet } from "./code-snippet";
import {
  BASE_URL,
  CategoryType,
  getUrlExampleName,
  getUrlRegistryDependencies,
  getUrlRegistryNeeds,
} from "@/lib/utils";
import { CodeDocType, CodeView } from "@/types";
import { PropsWithChildren } from "react";
import { Previewer } from "../previewer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { RegistryDependent } from "./registry-dependent";
import { FileViewer } from "./file-viewer";
import { CodeSnippetRegistryInstall } from "./code-snippet-registry-install";
import { CodeSnippetInstall } from "./code-snippet-install";
export type CodeDocsProps = PropsWithChildren<CodeDocType>;

export function CodeDocs({ children, ...codeDocs }: CodeDocsProps) {
  const {
    title,
    description,
    demo,
    props,
    componentName,
    registryUrl: registry,
    fileName,
  } = codeDocs;
  const properties = Object.entries(props || {}).map(([name, prop]) => ({
    name,
    type: prop.type || "unknown",
    default: prop.default || "-",
    description: prop.description || "-",
    required: prop.required || false,
  }));
  const dependents = getUrlRegistryNeeds(codeDocs.name);
  const exemples = Object.entries(codeDocs.exemples);
  const demoPath = demo.find((d) => d.filename === "main.tsx")?.path;
  return (
    <section id="button" className="space-y-6 mb-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <h3 className="text-2xl font-semibold">Preview</h3>
        <TabsList className="mb-1">
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

        <TabsContent value="preview" className="space-y-4 ">
          <Card className="bg-background">
            <CardContent className="space-y-4 ">
              <Previewer path={demoPath} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code">
          <FileViewer codes={demo} />
          {/* <CodeViewer
            codes={
              codes.length
                ? codes
                : [
                    {
                      content: "// Empty code",
                      filename: "preview.tsx",
                      language: "tsx",
                    },
                  ]
            }
          /> */}
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
      {/* Dependencies */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h4 className="text-xl font-semibold">
              Dependencies?
              <Badge className="min-w-5 px-1 ml-1" variant={"secondary"}>
                {codeDocs.dependencies?.length || 0}
              </Badge>
            </h4>
          </AccordionTrigger>
          <AccordionContent>
            {codeDocs.dependencies.map((dep) => (
              <Badge key={dep} className="mr-2" variant="outline" asChild>
                <Link
                  href={`https://www.npmjs.com/package/${dep}`}
                  target="_blank"
                >
                  {dep}
                </Link>
              </Badge>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-shadcn">
          <AccordionTrigger>
            <h4 className="text-xl font-semibold">
              Shadcn dependencies?
              <Badge className="min-w-5 px-1 ml-1" variant={"secondary"}>
                {codeDocs.shadcnDependencies?.length || 0}
              </Badge>
            </h4>
          </AccordionTrigger>
          <AccordionContent>
            {codeDocs.shadcnDependencies.map((dep) => (
              <Badge key={dep} className="mr-2" variant="outline" asChild>
                <Link
                  href={`https://ui.shadcn.com/docs/components/${dep}`}
                  target="_blank"
                >
                  {dep}
                </Link>
              </Badge>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <h4 className="text-xl font-semibold">
              Registry dependencies?
              <Badge className="min-w-5 px-1 ml-1" variant={"secondary"}>
                {codeDocs.registryDependencies?.length || 0}
              </Badge>
            </h4>
          </AccordionTrigger>
          <AccordionContent>
            {codeDocs.registryDependencies.map((dep) => {
              return <RegistryDependent name={dep} key={dep} />;
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <h4 className="text-xl font-semibold">
              needed?
              <Badge className="min-w-5 px-1 ml-1" variant={"secondary"}>
                {dependents?.length || 0}
              </Badge>
            </h4>
          </AccordionTrigger>
          <AccordionContent>
            {dependents.map((dep) => {
              return <RegistryDependent name={dep.name} key={dep.name} />;
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* installation */}
      {registry && (
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Installation</h3>
          <Tabs defaultValue="CLI" className="w-full ">
            <TabsList className="mb-1">
              <TabsTrigger value="CLI">CLI</TabsTrigger>
              <TabsTrigger value="Manual">Manual</TabsTrigger>
            </TabsList>
            <div className="px-2">
              <TabsContent value="CLI">
                <CodeSnippetRegistryInstall dependencies={[registry]} />
                {codeDocs.demo.length > 0 && (
                  <div className="mt-4">
                    <p>Install with demo</p>
                    <CodeSnippetRegistryInstall
                      dependencies={[getUrlExampleName(codeDocs.name, "demo")]}
                    />
                  </div>
                )}
              </TabsContent>
              <TabsContent value="Manual">
                {codeDocs.dependencies.length > 0 && (
                  <div className="mb-8">
                    <p>Install the following dependencies:</p>
                    <CodeSnippetInstall dependencies={codeDocs.dependencies} />
                  </div>
                )}
                {codeDocs.shadcnDependencies.length > 0 && (
                  <div className="mb-8">
                    <p>Install the following shadcn dependencies:</p>
                    <CodeSnippetRegistryInstall
                      dependencies={codeDocs.shadcnDependencies}
                    />
                  </div>
                )}
                {codeDocs.registryDependencies.length > 0 && (
                  <div className="mb-8">
                    <p>Install the following registry dependencies:</p>
                    <CodeSnippetRegistryInstall
                      dependencies={codeDocs.registryDependencies}
                    />
                  </div>
                )}
                <CodeViewer
                  codes={[
                    {
                      content: codeDocs.content,
                      filename: codeDocs.fileName,
                      language: "tsx",
                      description: "",
                      path: codeDocs.target || codeDocs.filePath,
                      props: {},
                      title: "",
                    },
                  ]}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      )}

      {/* exemples */}
      {exemples && exemples.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Exemples</h3>
          <p className="text-muted-foreground">
            This is an example of how to use this component.
          </p>
          {exemples.map(([exempleTitle, exempleCodes], index) => (
            <Card key={index} className="mb-8 bg-background">
              <CardHeader>
                <CardTitle>{exempleTitle}</CardTitle>
              </CardHeader>
              <CardContent className="bg-background">
                <CodeExample codes={exempleCodes} />
              </CardContent>
              <CardFooter className="block w-full">
                <div>
                  <p>install: {exempleTitle} </p>
                  <CodeSnippetRegistryInstall
                    dependencies={[
                      getUrlExampleName(codeDocs.name, exempleTitle),
                    ]}
                  />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

function CodeExample({ codes }: { codes: CodeView[] }) {
  const code = codes.find((c) => c.filename == "main.tsx");
  if (!code) return "main.tsx not found!";
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

        <TabsContent value="preview" className="space-y-4 ">
          <Card className="bg-background">
            <CardContent className="space-y-4">
              <Previewer path={code.path} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code">
          <FileViewer codes={codes} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
