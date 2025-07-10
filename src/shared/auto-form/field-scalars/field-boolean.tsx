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
import { ComponentProps, ReactNode, useId } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
              <div
                id={`${id}-description`}
                className="text-muted-foreground text-xs"
              >
                <FormDescription>
                  {fieldSchema.meta?.description}
                </FormDescription>
              </div>
              <FormMessage />
            </div>
          </div>
        );
      }}
    />
  );
}

export type FieldCheckboxProps = ComponentProps<typeof Checkbox> & {
  label?: ReactNode;
  description?: ReactNode;
  sublabel?: ReactNode;
};
export function FieldCheckbox(props: FieldCheckboxProps) {
  const id = useId();
  const checked =
    typeof props.value == "undefined" ? "indeterminate" : !!props.value;
  return (
    <div className="border-input  has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-2 shadow-xs outline-none">
      <Checkbox
        className="order-1 after:absolute after:inset-0 "
        aria-describedby={`${id}-description`}
        {...props} // Spread the props to Checkbox
        id={id}
        checked={checked}
      />
      <div className="grid grow gap-2">
        <FormLabel htmlFor={id}>
          {props.label}
          <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
            {props.sublabel}
          </span>
        </FormLabel>
        <div id={`${id}-description`} className="text-muted-foreground text-xs">
          {props.description}
        </div>
        <FormMessage />
      </div>
    </div>
  );
}
