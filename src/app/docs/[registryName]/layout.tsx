import React from "react";

import { AppSidebarDoc } from "@/components/app-sidebar-doc";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getPackage, getRegistry } from "@/lib/utils";

type Props = {
  params: Promise<Record<string, string>>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
  children?: React.ReactNode;
};

export default async function Layout(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { registryName } = params;
  const registry = getRegistry(registryName);
  if (!registry) {
    return <div>Package not found.</div>;
  }
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebarDoc registry={registry} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {props.children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
