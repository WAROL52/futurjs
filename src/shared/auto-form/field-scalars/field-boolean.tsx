"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FieldRoot, FieldRootProps } from "./field-root";
import { Switch } from "@/components/ui/switch";

export type FieldBooleanProps = FieldRootProps;

export function FieldBoolean(props: FieldBooleanProps) {
  return (
    <FieldRoot
      {...props}
      render={({ field, fieldSchema, form }) => {
        return (
          <FormField
            control={form.control}
            name={fieldSchema.props.name}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>{fieldSchema.props.name}</FormLabel>
                  <FormDescription>
                    {fieldSchema.meta?.description}
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    defaultChecked={false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        );
      }}
    />
  );
}
