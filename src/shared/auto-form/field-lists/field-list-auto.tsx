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

export type FieldListAutoProps = FieldRootProps;

export function FieldListAuto(props: FieldListAutoProps) {
  const { fieldSchema: field, form } = props;
  if (field.props.type == "String") return <FieldListString {...props} />;
  if (field.props.type == "Boolean") return <FieldListBoolean {...props} />;
  if (field.props.type == "Bytes") return <FieldListBytes {...props} />;
  if (field.props.type == "DateTime") return <FieldListDateTime {...props} />;
  if (["Int", "Float", "Decimal", "BigInt"].includes(field.props.type))
    return <FieldListNumber {...props} />;
  // if (field.props.kind === "enum") return <FieldEnum {...props} />;
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
            }) => {
              return (
                <div>
                  {name}
                  <Input
                    className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2 data-[state=checked]:[&_span]:rtl:-translate-x-2"
                    checked={value}
                    defaultChecked={false}
                    onChange={(v) => onValueChange(Boolean(v.target.checked))}
                    name={name}
                    id={name}
                    disabled={disabled}
                  />
                </div>
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
