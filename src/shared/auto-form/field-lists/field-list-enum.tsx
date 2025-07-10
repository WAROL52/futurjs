"use client";

import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import {
  FieldRoot,
  FieldRootProps,
  getFieldInfo,
} from "../field-scalars/field-root";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export type FieldListEnumProps = FieldRootProps;

export function FieldListEnum(props: FieldListEnumProps) {
  return (
    <FieldRoot
      {...props}
      render={(props) => {
        const { fieldSchema, form, field } = props;
        form.formState.errors[field.name];
        const fieldInfo = getFieldInfo({ fieldSchema, form, field });
        return (
          <FormItem>
            <div className="*:not-first:mt-2">
              <FormLabel>{fieldInfo.label}</FormLabel>
              <FormControl>
                <MultipleSelector
                  {...field}
                  commandProps={{
                    label: "Select " + fieldSchema.props.name,
                  }}
                  value={
                    ((field.value as string[]) || []).map((v) => ({
                      value: v,
                      label: v,
                    })) || []
                  }
                  onChange={(value: Option[]) => {
                    const newValue = value.map((v) => v.value);
                    field.onChange(newValue);
                  }}
                  options={fieldSchema.meta?.enumProps?.values.map((value) => ({
                    value: value.name,
                    label: value.name,
                  }))}
                  placeholder={
                    "Select " + (fieldSchema.meta?.enumProps?.name || "options")
                  }
                  emptyIndicator={
                    <p className="text-center text-sm">No results found</p>
                  }
                />
              </FormControl>
              <div
                className="text-muted-foreground mt-2 text-xs"
                role="region"
                aria-live="polite"
              >
                <FormDescription>{fieldInfo.description}</FormDescription>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
