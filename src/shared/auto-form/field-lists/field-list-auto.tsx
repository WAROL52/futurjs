"use client";

import { Switch } from "@/components/ui/switch";
import {
  FieldRoot,
  FieldRootProps,
  getFieldInfo,
} from "../field-scalars/field-root";
import { FieldListRoot } from "./field-list-root";
import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldCheckbox } from "../field-scalars/field-boolean";
import { FieldListEnum } from "./field-list-enum";

export type FieldListAutoProps = FieldRootProps;

export function FieldListAuto(props: FieldListAutoProps) {
  const { fieldSchema: field, form } = props;
  if (field.props.type == "String") return <FieldListString {...props} />;
  if (field.props.type == "Boolean") return <FieldListBoolean {...props} />;
  if (field.props.type == "Bytes") return <FieldListBytes {...props} />;
  if (field.props.type == "DateTime") return <FieldListDateTime {...props} />;
  if (["Int", "Float", "Decimal", "BigInt"].includes(field.props.type))
    return <FieldListNumber {...props} />;
  if (field.props.kind === "enum") return <FieldListEnum {...props} />;

  // if (field.props.kind === "object") return <FieldRelationalAuto {...props} />;
  return (
    <FieldRoot
      {...props}
      render={(props) => {
        const { fieldSchema, form, field } = props;
        form.formState.errors[field.name];
        return <FieldListRoot {...props} />;
      }}
    />
  );
}

function FieldListString(props: FieldListAutoProps) {
  const { fieldSchema: field, form } = props;
  return (
    <FieldRoot
      {...props}
      render={(props) => {
        return <FieldListRoot {...props} type="text" />;
      }}
    />
  );
}

function FieldListNumber(props: FieldListAutoProps) {
  const { fieldSchema: field, form } = props;
  return (
    <FieldRoot
      {...props}
      render={(props) => {
        return <FieldListRoot {...props} type="number" convertValue={Number} />;
      }}
    />
  );
}

function FieldListBoolean(props: FieldListAutoProps) {
  const { fieldSchema: field, form } = props;
  return (
    <FieldRoot
      {...props}
      render={(props) => {
        return (
          <FieldListRoot
            {...props}
            convertValue={Boolean}
            renderInput={({
              value,
              onValueChange,
              name,
              disabled,
              placeholder,
              index,
            }) => {
              return (
                <FieldCheckbox
                  value={value}
                  onCheckedChange={onValueChange}
                  name={name}
                  disabled={disabled}
                  description={field.meta?.description}
                  sublabel={index + 1}
                  label={field.props.name}
                />
              );
            }}
          />
        );
      }}
    />
  );
}
function FieldListDateTime(props: FieldListAutoProps) {
  const { fieldSchema: field, form } = props;
  return (
    <FieldRoot
      {...props}
      render={(props) => {
        return (
          <FieldListRoot
            {...props}
            type="datetime-local"
            convertValue={(v) => new Date(v)}
          />
        );
      }}
    />
  );
}
function FieldListBytes(props: FieldListAutoProps) {
  const { fieldSchema: field, form } = props;
  return (
    <FieldRoot
      {...props}
      render={(props) => {
        return <FieldListRoot {...props} type="file" />;
      }}
    />
  );
}
