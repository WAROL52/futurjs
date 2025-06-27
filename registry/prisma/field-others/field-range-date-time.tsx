"use client";

export type FieldRangeDateTimeProps = {};

export function FieldRangeDateTime({}: FieldRangeDateTimeProps) {
  return <div>FieldRangeDateTime</div>;
}

FieldRangeDateTime.title = "FieldRangeDateTime";
FieldRangeDateTime.description =
  "A field for selecting a range of date and time values.";
FieldRangeDateTime.props = {
  initialValue: {
    type: "string",
    description: "Initial value for the date range",
    defaultValue: "",
    required: true,
  },
  onChange: {
    type: "function",
    description: "Callback when the date range changes",
  },
};
