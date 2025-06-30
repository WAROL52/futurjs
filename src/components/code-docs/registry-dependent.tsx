"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getUrlRegistryDependencies, getUrlRegistryNeeds } from "@/lib/utils";
import { Badge } from "../ui/badge";
import Link from "next/link";
export type RegistryDependentProps = {
  name: string;
};

export function RegistryDependent({ name }: RegistryDependentProps) {
  const dependents = getUrlRegistryNeeds(name);
  const url = getUrlRegistryDependencies(name);
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="secondary" asChild>
            <Link
              href={url ? `/docs${url}` : "#"}
              className="flex items-center gap-2"
            >
              {name}
            </Link>
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="py-3 bg-accent text-foreground">
          <div className="space-y-1">
            <p className="text-[13px] font-medium">
              ({dependents.length}) {name} needed by:
            </p>
            <div className="text-muted text-xs">
              {dependents.map((dep) => {
                return (
                  <Badge key={dep.name} variant="outline" asChild>
                    <Link
                      href={dep.url ? `/docs${dep.url}` : "#"}
                      className="flex items-center gap-2"
                    >
                      {dep.name}
                    </Link>
                  </Badge>
                );
              })}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
