"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormModelField } from "@/shared/prisma/hooks/use-prisma-schema";
import { UseFormReturn } from "react-hook-form";

export type FieldRootProps = {
  fieldSchema: FormModelField;
  form: UseFormReturn<Record<string, any>, any, Record<string, any>>;
  render?: (field: {
    schema: FormModelField;
    form: UseFormReturn<Record<string, any>, any, Record<string, any>>;
  }) => React.ReactNode;
};

export function FieldRoot({ fieldSchema, form, render }: FieldRootProps) {
  return (
    <FormField
      control={form.control}
      name={fieldSchema.props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{fieldSchema.props.name}</FormLabel>
          <FormControl>
            {render ? (
              render({ schema: fieldSchema, form })
            ) : (
              <Input {...field} />
            )}
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
