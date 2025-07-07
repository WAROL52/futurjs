"use client";

import {
  FieldRoot,
  FieldRootProps,
  getFieldInfo,
} from "../field-scalars/field-root";
import { FieldListRoot } from "./field-list-root";

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
          <FieldListRoot {...props} type="checkbox" convertValue={Boolean} />
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
