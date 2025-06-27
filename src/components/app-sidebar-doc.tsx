"use client"

import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { RegistryFig, RegistryPackage } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RegistrySwitcher } from "./registry-switcher";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
    {
      title: "Building Your Application",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#",
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true,
        },
        {
          title: "Rendering",
          url: "#",
        },
        {
          title: "Caching",
          url: "#",
        },
        {
          title: "Styling",
          url: "#",
        },
        {
          title: "Optimizing",
          url: "#",
        },
        {
          title: "Configuring",
          url: "#",
        },
        {
          title: "Testing",
          url: "#",
        },
        {
          title: "Authentication",
          url: "#",
        },
        {
          title: "Deploying",
          url: "#",
        },
        {
          title: "Upgrading",
          url: "#",
        },
        {
          title: "Examples",
          url: "#",
        },
      ],
    },
    {
      title: "API Reference",
      url: "#",
      items: [
        {
          title: "Components",
          url: "#",
        },
        {
          title: "File Conventions",
          url: "#",
        },
        {
          title: "Functions",
          url: "#",
        },
        {
          title: "next.config.js Options",
          url: "#",
        },
        {
          title: "CLI",
          url: "#",
        },
        {
          title: "Edge Runtime",
          url: "#",
        },
      ],
    },
    {
      title: "Architecture",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "#",
        },
        {
          title: "Fast Refresh",
          url: "#",
        },
        {
          title: "Next.js Compiler",
          url: "#",
        },
        {
          title: "Supported Browsers",
          url: "#",
        },
        {
          title: "Turbopack",
          url: "#",
        },
      ],
    },
    {
      title: "Community",
      url: "#",
      items: [
        {
          title: "Contribution Guide",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebarDoc({
  registry,...props

}: React.ComponentProps<typeof Sidebar> & { registry: RegistryFig }) {
  const path = usePathname()
  return (
    <Sidebar variant="inset" {...props} >
      <div className="md:my-8"></div>
      <SidebarHeader>
        <RegistrySwitcher/>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {(Object.values(registry.packages)).map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={path===`/docs${item.url}`}>
                  <Link href={`/docs${item.url}`} className="font-medium ">
                    {item.name}
                  </Link>
                </SidebarMenuButton>
                {item.codeDocs.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.codeDocs.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={path===`/docs${item.url}`}
                          className="text-foreground/60"
                        >
                          <Link
                            href={`/docs${item.url}`}
                            className=" text-sm text-foreground/60"
                          >
                            {item.title}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
