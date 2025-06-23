import React from "react";

import { AppSidebarDoc } from "@/components/app-sidebar-doc";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getPackage, getRegistry } from "@/lib/utils";
import Link from "next/link";
import { BreadcrumbDoc } from "@/components/breadcrumb-doc";

type Props = {
  params: Promise<{
    docName?: string;
    packageName?: string;
    registryName: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
  children?: React.ReactNode;
};

export default async function Layout(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { registryName,docName,packageName } = params;
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
          <BreadcrumbDoc/>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {props.children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
