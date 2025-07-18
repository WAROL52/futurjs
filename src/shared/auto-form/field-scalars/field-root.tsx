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
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

export type FieldRootRenderProps = {
  fieldSchema: FormModelField;
  form: UseFormReturn<Record<string, any>, any, Record<string, any>>;
  field: ControllerRenderProps<Record<string, any>, string>;
};
export type FieldRootProps = {
  fieldSchema: FormModelField;
  form: UseFormReturn<Record<string, any>, any, Record<string, any>>;
  render?: (field: FieldRootRenderProps) => React.ReactNode;
  inputProps?: React.ComponentProps<"input">;
};

export function FieldRoot({
  fieldSchema,
  form,
  render,
  inputProps,
}: FieldRootProps) {
  return (
    <FormField
      control={form.control}
      name={fieldSchema.props.name}
      render={({ field }) => {
        const fieldInfo = getFieldInfo({ fieldSchema, form, field });
        return (
          <>
            {render ? (
              render({ fieldSchema: fieldSchema, form, field })
            ) : (
              <FormItem>
                <FormLabel>{fieldInfo.label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={fieldInfo.placeholder}
                    {...inputProps}
                  />
                </FormControl>
                <FormDescription>{fieldInfo.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          </>
        );
      }}
    />
  );
}

export function getFieldInfo(field: FieldRootRenderProps) {
  return {
    name: field.fieldSchema.props.name,
    description: field.fieldSchema.meta?.description || "",
    label: field.fieldSchema.meta?.label || field.fieldSchema.props.name,
    placeholder: field.fieldSchema.meta?.placeholder || "",
    required: field.fieldSchema.props.isRequired || false,
  };
}
