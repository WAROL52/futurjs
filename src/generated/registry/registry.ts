
import { RegistryBuild } from "@/types";

export const REGISTRY_BUILD: RegistryBuild = {
  "new-york": {
    "name": "new-york",
    "description": "",
    "packages": {
      "example-form": {
        "name": "example-form",
        "description": "",
        "url": "/new-york/example-form",
        "codeDocs": [
          {
            "title": "ExampleForm",
            "description": "",
            "props": {},
            "url": "/new-york/example-form/example-form",
            "fileName": "example-form.tsx",
            "filePath": "registry/new-york/example-form/example-form.tsx",
            "name": "example-form",
            "registry": "https://futurjs.vercel.app/registry/example-form",
            "componentName": "ExampleForm",
            "codes": [],
            "exemples": []
          }
        ]
      },
      "hello-world": {
        "name": "hello-world",
        "description": "",
        "url": "/new-york/hello-world",
        "codeDocs": [
          {
            "title": "HelloWorld",
            "description": "",
            "props": {},
            "url": "/new-york/hello-world/hello-world",
            "fileName": "hello-world.tsx",
            "filePath": "registry/new-york/hello-world/hello-world.tsx",
            "name": "hello-world",
            "registry": "https://futurjs.vercel.app/registry/hello-world",
            "componentName": "HelloWorld",
            "codes": [],
            "exemples": [
              {
                "title": "Hello",
                "description": "",
                "props": {},
                "language": "tsx",
                "code": "\"use client\";\n\nexport type HelloProps = {};\n\nexport default function Hello({}: HelloProps) {\n  return <div>Hello</div>;\n}\n",
                "filename": "hello.tsx",
                "path": "_exemples/hello-world/hello.tsx"
              }
            ]
          }
        ]
      }
    },
    "url": "/new-york"
  },
  "prisma": {
    "name": "prisma",
    "description": "",
    "packages": {
      "components": {
        "name": "components",
        "description": "",
        "url": "/prisma/components",
        "codeDocs": [
          {
            "title": "FieldRangeDateTime",
            "description": "A field for selecting a range of date and time values.",
            "props": {
              "initialValue": {
                "type": "string",
                "description": "Initial value for the date range",
                "defaultValue": "",
                "required": true
              },
              "onChange": {
                "type": "function",
                "description": "Callback when the date range changes"
              }
            },
            "url": "/prisma/components/field-range-date-time",
            "fileName": "field-range-date-time.tsx",
            "filePath": "registry/prisma/components/field-range-date-time.tsx",
            "name": "field-range-date-time",
            "registry": "https://futurjs.vercel.app/registry/field-range-date-time",
            "componentName": "FieldRangeDateTime",
            "codes": [
              {
                "title": "Preview",
                "description": "",
                "props": {},
                "language": "tsx",
                "code": "\"use client\";\n\nexport type PreviewProps = {};\n\nexport default function Preview({}: PreviewProps) {\n  return <div>Preview</div>;\n}\n",
                "filename": "preview.tsx",
                "path": "_exemples/field-range-date-time/preview.tsx"
              }
            ],
            "exemples": [
              {
                "title": "Page",
                "description": "",
                "props": {},
                "language": "tsx",
                "code": "import React from \"react\";\n\n// dossier:~/52/futurjs/_exemples/field-range-date-time\nexport default async function Page() {\n  return<div>Page _exemples/field-range-date-time/page.tsx</div>;\n}",
                "filename": "page.tsx",
                "path": "_exemples/field-range-date-time/page.tsx"
              }
            ]
          },
          {
            "title": "FieldFloat",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-float",
            "fileName": "field-float.tsx",
            "filePath": "registry/prisma/components/field-float.tsx",
            "name": "field-float",
            "registry": "https://futurjs.vercel.app/registry/field-float",
            "componentName": "FieldFloat",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldPassword",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-password",
            "fileName": "field-password.tsx",
            "filePath": "registry/prisma/components/field-password.tsx",
            "name": "field-password",
            "registry": "https://futurjs.vercel.app/registry/field-password",
            "componentName": "FieldPassword",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldUserCardNumber",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-user-card-number",
            "fileName": "field-user-card-number.tsx",
            "filePath": "registry/prisma/components/field-user-card-number.tsx",
            "name": "field-user-card-number",
            "registry": "https://futurjs.vercel.app/registry/field-user-card-number",
            "componentName": "FieldUserCardNumber",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldUserPhoneNumber",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-user-phone-number",
            "fileName": "field-user-phone-number.tsx",
            "filePath": "registry/prisma/components/field-user-phone-number.tsx",
            "name": "field-user-phone-number",
            "registry": "https://futurjs.vercel.app/registry/field-user-phone-number",
            "componentName": "FieldUserPhoneNumber",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldOneToMany",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-one-to-many",
            "fileName": "field-one-to-many.tsx",
            "filePath": "registry/prisma/components/field-one-to-many.tsx",
            "name": "field-one-to-many",
            "registry": "https://futurjs.vercel.app/registry/field-one-to-many",
            "componentName": "FieldOneToMany",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldEnum",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-enum",
            "fileName": "field-enum.tsx",
            "filePath": "registry/prisma/components/field-enum.tsx",
            "name": "field-enum",
            "registry": "https://futurjs.vercel.app/registry/field-enum",
            "componentName": "FieldEnum",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldManyToMany",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-many-to-many",
            "fileName": "field-many-to-many.tsx",
            "filePath": "registry/prisma/components/field-many-to-many.tsx",
            "name": "field-many-to-many",
            "registry": "https://futurjs.vercel.app/registry/field-many-to-many",
            "componentName": "FieldManyToMany",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldRangeDate",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-range-date",
            "fileName": "field-range-date.tsx",
            "filePath": "registry/prisma/components/field-range-date.tsx",
            "name": "field-range-date",
            "registry": "https://futurjs.vercel.app/registry/field-range-date",
            "componentName": "FieldRangeDate",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldUserCardExpiryDate",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-user-card-expiry-date",
            "fileName": "field-user-card-expiry-date.tsx",
            "filePath": "registry/prisma/components/field-user-card-expiry-date.tsx",
            "name": "field-user-card-expiry-date",
            "registry": "https://futurjs.vercel.app/registry/field-user-card-expiry-date",
            "componentName": "FieldUserCardExpiryDate",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldDecimal",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-decimal",
            "fileName": "field-decimal.tsx",
            "filePath": "registry/prisma/components/field-decimal.tsx",
            "name": "field-decimal",
            "registry": "https://futurjs.vercel.app/registry/field-decimal",
            "componentName": "FieldDecimal",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldRichText",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-rich-text",
            "fileName": "field-rich-text.tsx",
            "filePath": "registry/prisma/components/field-rich-text.tsx",
            "name": "field-rich-text",
            "registry": "https://futurjs.vercel.app/registry/field-rich-text",
            "componentName": "FieldRichText",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldDate",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-date",
            "fileName": "field-date.tsx",
            "filePath": "registry/prisma/components/field-date.tsx",
            "name": "field-date",
            "registry": "https://futurjs.vercel.app/registry/field-date",
            "componentName": "FieldDate",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldString",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-string",
            "fileName": "field-string.tsx",
            "filePath": "registry/prisma/components/field-string.tsx",
            "name": "field-string",
            "registry": "https://futurjs.vercel.app/registry/field-string",
            "componentName": "FieldString",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldInt",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-int",
            "fileName": "field-int.tsx",
            "filePath": "registry/prisma/components/field-int.tsx",
            "name": "field-int",
            "registry": "https://futurjs.vercel.app/registry/field-int",
            "componentName": "FieldInt",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldUserCreatePassword",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-user-create-password",
            "fileName": "field-user-create-password.tsx",
            "filePath": "registry/prisma/components/field-user-create-password.tsx",
            "name": "field-user-create-password",
            "registry": "https://futurjs.vercel.app/registry/field-user-create-password",
            "componentName": "FieldUserCreatePassword",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldRangeTime",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-range-time",
            "fileName": "field-range-time.tsx",
            "filePath": "registry/prisma/components/field-range-time.tsx",
            "name": "field-range-time",
            "registry": "https://futurjs.vercel.app/registry/field-range-time",
            "componentName": "FieldRangeTime",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldOneToOne",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-one-to-one",
            "fileName": "field-one-to-one.tsx",
            "filePath": "registry/prisma/components/field-one-to-one.tsx",
            "name": "field-one-to-one",
            "registry": "https://futurjs.vercel.app/registry/field-one-to-one",
            "componentName": "FieldOneToOne",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldJson",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-json",
            "fileName": "field-json.tsx",
            "filePath": "registry/prisma/components/field-json.tsx",
            "name": "field-json",
            "registry": "https://futurjs.vercel.app/registry/field-json",
            "componentName": "FieldJson",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldManyToOne",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-many-to-one",
            "fileName": "field-many-to-one.tsx",
            "filePath": "registry/prisma/components/field-many-to-one.tsx",
            "name": "field-many-to-one",
            "registry": "https://futurjs.vercel.app/registry/field-many-to-one",
            "componentName": "FieldManyToOne",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldUserCardCode",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-user-card-code",
            "fileName": "field-user-card-code.tsx",
            "filePath": "registry/prisma/components/field-user-card-code.tsx",
            "name": "field-user-card-code",
            "registry": "https://futurjs.vercel.app/registry/field-user-card-code",
            "componentName": "FieldUserCardCode",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldOtp",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-otp",
            "fileName": "field-otp.tsx",
            "filePath": "registry/prisma/components/field-otp.tsx",
            "name": "field-otp",
            "registry": "https://futurjs.vercel.app/registry/field-otp",
            "componentName": "FieldOtp",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldDateTime",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-date-time",
            "fileName": "field-date-time.tsx",
            "filePath": "registry/prisma/components/field-date-time.tsx",
            "name": "field-date-time",
            "registry": "https://futurjs.vercel.app/registry/field-date-time",
            "componentName": "FieldDateTime",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldTime",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-time",
            "fileName": "field-time.tsx",
            "filePath": "registry/prisma/components/field-time.tsx",
            "name": "field-time",
            "registry": "https://futurjs.vercel.app/registry/field-time",
            "componentName": "FieldTime",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldRange",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-range",
            "fileName": "field-range.tsx",
            "filePath": "registry/prisma/components/field-range.tsx",
            "name": "field-range",
            "registry": "https://futurjs.vercel.app/registry/field-range",
            "componentName": "FieldRange",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldBigInt",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-big-int",
            "fileName": "field-big-int.tsx",
            "filePath": "registry/prisma/components/field-big-int.tsx",
            "name": "field-big-int",
            "registry": "https://futurjs.vercel.app/registry/field-big-int",
            "componentName": "FieldBigInt",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldBoolean",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-boolean",
            "fileName": "field-boolean.tsx",
            "filePath": "registry/prisma/components/field-boolean.tsx",
            "name": "field-boolean",
            "registry": "https://futurjs.vercel.app/registry/field-boolean",
            "componentName": "FieldBoolean",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldBytes",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-bytes",
            "fileName": "field-bytes.tsx",
            "filePath": "registry/prisma/components/field-bytes.tsx",
            "name": "field-bytes",
            "registry": "https://futurjs.vercel.app/registry/field-bytes",
            "componentName": "FieldBytes",
            "codes": [],
            "exemples": []
          },
          {
            "title": "FieldAny",
            "description": "",
            "props": {},
            "url": "/prisma/components/field-any",
            "fileName": "field-any.tsx",
            "filePath": "registry/prisma/components/field-any.tsx",
            "name": "field-any",
            "registry": "https://futurjs.vercel.app/registry/field-any",
            "componentName": "FieldAny",
            "codes": [],
            "exemples": []
          }
        ]
      }
    },
    "url": "/prisma"
  }
}

	