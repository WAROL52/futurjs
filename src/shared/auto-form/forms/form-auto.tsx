"use client";
import * as z from "zod/v4";
export type FormAutoProps = {};
import JsonView from "@uiw/react-json-view";
import { JsonViewVscode } from "@/components/json-view-vscode";
import { usePrismaSchema } from "@/shared/prisma/hooks/use-prisma-schema";
import { FieldAuto } from "../field-scalars/field-auto";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { FormRoot } from "./form-root";
import { dbSchema } from "@/shared/db-tools/db-schema/dbSchema";

export function FormAuto({}: FormAutoProps) {
  // const { data, isLoading } = usePrismaSchema();
  const [modelName, setModelName] = React.useState("User");
  // if (isLoading)
  //   return <div>state: {isLoading ? "chargement..." : "finish"}</div>;
  // const model = data.form.models.find((model) => model.name === modelName);
  const { models } = dbSchema;
  const model = models.find((model) => model.name === modelName);
  const selectModel = (
    <Select onValueChange={setModelName} value={modelName}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {models.map((model) => (
            <SelectItem key={model.name} value={model.name}>
              {model.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
  if (!model) {
    return (
      <div>
        {selectModel}
        model not Found!
      </div>
    );
  }
  return (
    <div>
      {selectModel}
      <br />
      <div className="border p-4 rounded-md ">
        <FormRoot
          key={model.name}
          model={model}
          onSubmit={(data) => console.log(data)}
        />
      </div>
    </div>
  );
}
