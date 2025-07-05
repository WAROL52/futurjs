"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldRoot, FieldRootProps } from "./field-root";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

export type FieldEnumProps = FieldRootProps;

export function FieldEnum(props: FieldEnumProps) {
  return (
    <FieldRoot
      {...props}
      render={({ form, field, fieldSchema }) => {
        return (
          <FormItem>
            <FormLabel>{fieldSchema.props.name}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {fieldSchema.meta?.enumProps?.values.map((value) => (
                  <SelectItem key={value.name} value={value.name}>
                    {value.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
