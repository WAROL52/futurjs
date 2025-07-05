"use client";

import { FormModelField } from "@/shared/prisma/hooks/use-prisma-schema";
import { FieldString } from "./field-string";
import { FieldBoolean } from "./field-boolean";
import { FieldBytes } from "./field-bytes";
import { FieldDateTime } from "./field-date-time";
import { FieldNumber } from "./field-number";
import { FieldEnum } from "./field-enum";
import { FieldRelationalAuto } from "../field-relationals/field-relational-auto";
import { FieldRoot, FieldRootProps } from "./field-root";
import { UseFormReturn } from "react-hook-form";
import { FieldListAuto } from "../field-lists/field-list-auto";

export type FieldAutoProps = FieldRootProps;

export function FieldAuto(props: FieldAutoProps) {
  const { fieldSchema: field, form } = props;
  if (field.props.isList) return <FieldListAuto {...props} />;
  if (field.props.type == "String") return <FieldString {...props} />;
  if (field.props.type == "Boolean") return <FieldBoolean {...props} />;
  if (field.props.type == "Bytes") return <FieldBytes {...props} />;
  if (field.props.type == "DateTime") return <FieldDateTime {...props} />;
  if (["Int", "Float", "Decimal", "BigInt"].includes(field.props.type))
    return <FieldNumber {...props} />;
  if (field.props.kind === "enum") return <FieldEnum {...props} />;
  if (field.props.kind === "object") return <FieldRelationalAuto {...props} />;
  return <FieldRoot {...props} />;
}
