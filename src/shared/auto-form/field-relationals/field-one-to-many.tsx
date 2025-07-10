"use client";

import { useId, useState } from "react";
import { CheckIcon, ChevronDownIcon, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FieldRootProps } from "../field-scalars/field-root";

const organizations = [
  {
    value: "originui",
    label: "Origin UI",
  },
  {
    value: "cruip",
    label: "Cruip",
  },
];
export type FieldOneToManyProps = FieldRootProps;

export function FieldOneToMany(props: FieldOneToManyProps) {
  const { fieldSchema } = props;

  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("originui");

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>{fieldSchema.props.name}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value
                ? organizations.find(
                    (organization) => organization.value === value
                  )?.label
                : "Select organization"}
            </span>
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Find organization" />
            <CommandList>
              <CommandEmpty>No organization found.</CommandEmpty>
              <CommandGroup>
                {organizations.map((organization) => (
                  <CommandItem
                    key={organization.value}
                    value={organization.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Square className="" text={organization.label[0]} />
                    {organization.label}
                    {value === organization.value && (
                      <CheckIcon size={16} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-normal"
                >
                  <PlusIcon
                    size={16}
                    className="-ms-2 opacity-60"
                    aria-hidden="true"
                  />
                  New organization
                </Button>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

const alphaClassNames: Record<string, string> = {
  a: "bg-indigo-400/20 text-indigo-50",
  b: "bg-indigo-400/20 text-indigo-100",
  c: "bg-indigo-400/20 text-indigo-200",
  d: "bg-indigo-400/20 text-indigo-300",
  e: "bg-indigo-400/20 text-indigo-400",
  f: "bg-indigo-400/20 text-indigo-500",
  g: "bg-indigo-400/20 text-indigo-600",
  h: "bg-indigo-400/20 text-indigo-700",
  i: "bg-indigo-400/20 text-indigo-800",
  j: "bg-indigo-400/20 text-indigo-900",
  k: "bg-purple-400/20 text-purple-50",
  l: "bg-purple-400/20 text-purple-100",
  m: "bg-purple-400/20 text-purple-200",
  n: "bg-purple-400/20 text-purple-300",
  o: "bg-purple-400/20 text-purple-400",
  p: "bg-purple-400/20 text-purple-500",
  q: "bg-purple-400/20 text-purple-600",
  r: "bg-purple-400/20 text-purple-700",
  s: "bg-purple-400/20 text-purple-800",
  t: "bg-purple-400/20 text-purple-900",
  u: "bg-rose-400/20 text-rose-100",
  v: "bg-rose-400/20 text-rose-200",
  w: "bg-rose-400/20 text-rose-300",
  x: "bg-rose-400/20 text-rose-400",
  y: "bg-rose-400/20 text-rose-500",
  z: "bg-rose-400/20 text-rose-600",
};

const Square = ({ className, text }: { className?: string; text: string }) => (
  <span
    data-square
    className={cn(
      "bg-muted text-muted-foreground flex size-5 items-center justify-center rounded text-xs font-medium",
      className,
      alphaClassNames[text.toString().toLowerCase()] || "bg-gray-500"
    )}
    aria-hidden="true"
  >
    {text}
  </span>
);
