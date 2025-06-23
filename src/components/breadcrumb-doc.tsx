"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
export type BreadcrumbDocProps = {};

export function BreadcrumbDoc({}: BreadcrumbDocProps) {
	const path = usePathname()
	const [home,docs,registryName, packageName, docName] = path.split('/');
  return <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                <Link href="/docs">
                  Docs
                </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                <Link href={`/docs/${registryName}`}>
                  {registryName}
                </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {packageName && (<>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                {docName ? (
                  <BreadcrumbLink asChild>
                  <Link href={`/docs/${registryName}/${packageName}`}>
                    {packageName}
                  </Link>
                  </BreadcrumbLink>) : 
                <BreadcrumbPage>{packageName}</BreadcrumbPage>
                }
              </BreadcrumbItem>
              </>)}
              {docName && (<>
              <BreadcrumbSeparator  />
              <BreadcrumbItem>
                <BreadcrumbPage>{docName}</BreadcrumbPage>
              </BreadcrumbItem>
              </>)}
            </BreadcrumbList>
          </Breadcrumb>
}