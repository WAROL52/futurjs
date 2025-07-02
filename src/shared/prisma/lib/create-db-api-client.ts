"use client";
import axios, { AxiosError } from "axios";
import { ActionHandler, createQueryHook } from "./create-query-hook";

export type DbHookPrisma<T = any> = {
  [K in keyof T as K extends `$${infer R}` ? never : K]: Omit<T[K], "fields">;
};

export type DbConfig = {
  baseUrl: string;
};

export function createDbApiClient<T extends ActionHandler>(config: DbConfig) {
  const dbClient = createProxy<T>(config);
  const queryHook = createQueryHook(dbClient);
  return {
    useDbQuery: queryHook.useActionQuery,
    useDbMutation: queryHook.useActionMutation,
  };
}
createDbApiClient.registryDependencies = ["create-query-hook"];
createDbApiClient.dependencies = ["axios"];

function createProxy<T extends object>(config: DbConfig) {
  return new Proxy(
    {},
    {
      get: (_, modelName) => {
        return new Proxy(
          {},
          {
            get: (_, methodName) => {
              return (args: Record<string, any>) => {
                return fetchDbData(
                  modelName as string,
                  methodName as string,
                  args,
                  config
                );
              };
            },
          }
        );
      },
    }
  ) as T;
}

async function fetchDbData<T>(
  modelName: string,
  methodName: string,
  args: Record<string, any>,
  config: DbConfig
) {
  if (!modelName || !methodName) {
    throw new Error("Model name and method name must be provided.");
  }
  try {
    const res = await axios.post(
      `${config.baseUrl}/${modelName}/${methodName}`,
      {
        args,
      }
    );
    return res.data || null;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(
      String(axiosError.response?.data || axiosError.message || String(error))
    );
  }
}
