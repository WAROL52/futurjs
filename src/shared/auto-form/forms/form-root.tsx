"use client";

import { FormModel } from "@/shared/prisma/hooks/use-prisma-schema";
import { FieldAuto } from "../field-scalars/field-auto";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
export type FormRootProps = {
  model: FormModel;
  defaultValues?: object;
  onSubmit: (data: object) => void;
};

export function FormRoot({ model, defaultValues, onSubmit }: FormRootProps) {
  const form = useForm<z.infer<typeof model.zodType>>({
    resolver: zodResolver(model.zodType),
    defaultValues: defaultValues,
  });
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          {model.fields.map((field) => {
            return (
              <FieldAuto
                key={field.props.name}
                fieldSchema={field}
                form={form}
              />
            );
          })}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
