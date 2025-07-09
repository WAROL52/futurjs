"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldRoot, FieldRootProps } from "./field-root";
import { Switch } from "@/components/ui/switch";
import { useId } from "react";

export type FieldBooleanProps = FieldRootProps;

export function FieldBoolean(props: FieldBooleanProps) {
  const id = useId();
  return (
    <FieldRoot
      {...props}
      render={({ field, fieldSchema, form }) => {
        return (
          <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
            <Switch
              id={id}
              className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2 data-[state=checked]:[&_span]:rtl:-translate-x-2"
              aria-describedby={`${id}-description`}
              checked={field.value}
              defaultChecked={false}
              onCheckedChange={field.onChange}
            />
            <div className="grid grow gap-2">
              <FormLabel htmlFor={id}>
                {fieldSchema.props.name}
                {/* <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                  (Sublabel)
                </span> */}
              </FormLabel>
              <p
                id={`${id}-description`}
                className="text-muted-foreground text-xs"
              >
                <FormDescription>
                  {fieldSchema.meta?.description}
                </FormDescription>
              </p>
              <FormMessage />
            </div>
          </div>
        );
      }}
    />
  );
}
