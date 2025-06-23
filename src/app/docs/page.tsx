import { REGISTRY_BUILD } from "@/generated/registry/registry";
import Link from "next/link";
import React from "react";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {Object.values(REGISTRY_BUILD).map((reg) => {
        return (
          <div key={reg.name} className="p-4 m-2 border rounded shadow-lg">
            <h2 className="text-xl font-bold">{reg.name}</h2>
            <p className="text-gray-700">{reg.description}</p>
            <Link
              href={"/docs" + reg.url}
              className="text-blue-500 hover:underline"
            >
              View Documentation
            </Link>
          </div>
        );
      })}
    </div>
  );
}
