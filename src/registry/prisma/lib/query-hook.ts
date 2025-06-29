"use client";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  QueryKey,
  QueryFunctionContext,
  DefaultError,
  UseMutationOptions,
} from "@tanstack/react-query";

export type FnDbQuery<
  T,
  R,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = never
> = (
  dbClient: T,
  context: QueryFunctionContext<TQueryKey, TPageParam>
) => R | Promise<R>;

export type DbClient<T = any> = {
  [K in keyof T as K extends `$${infer R}` ? never : K]: Omit<T[K], "fields">;
};

export type UseDbQueryOptions<T, R, TQueryKey extends QueryKey = QueryKey> = {
  queryFn: FnDbQuery<DbClient<T>, R, TQueryKey>;
} & Omit<UseQueryOptions<R, DefaultError, R, TQueryKey>, "queryFn">;

export type FnDbMutation<T, TData = unknown, TVariables = unknown> = (
  variables: TVariables,
  dbClient: T
) => Promise<TData>;

export type UseDbMutationOptions<
  T,
  R,
  TVariables = unknown,
  TContext = unknown
> = {
  mutationFn: FnDbMutation<DbClient<T>, R, TVariables>;
  invalidateOnSuccess?: QueryKey[];
} & Omit<
  UseMutationOptions<R, DefaultError, TVariables, TContext>,
  "mutationFn"
>;
export type DbConfig = {
  baseUrl: string;
};
export type HandlerAction = {
  [modelName: string]: {
    [methodName: string]: ((args: any) => any) | ((args?: any) => any);
  };
};

export function createQueryHook<T extends HandlerAction>(handler: T) {
  return {
    useDbQuery: createUseDbQuery<T>(handler),
    useDbMutation: createUseDbMutation<T>(handler),
  };
}

function createUseDbQuery<T extends object>(dbProxy: DbClient<T>) {
  return function useDbQuery<R, TQueryKey extends QueryKey = QueryKey>(
    options: UseDbQueryOptions<T, R, TQueryKey>
  ) {
    return useQuery({
      ...options,
      queryFn: (context) => options.queryFn(dbProxy, context),
    });
  };
}

function createUseDbMutation<T extends object>(dbProxy: DbClient<T>) {
  return function useDbMutation<R, TVariables = unknown, TContext = unknown>(
    options: UseDbMutationOptions<T, R, TVariables, TContext>
  ) {
    const queryClient = useQueryClient();
    return useMutation({
      ...options,
      mutationFn: (variables) => options.mutationFn(variables, dbProxy),
      onSuccess(data, variables, context) {
        if (options.invalidateOnSuccess) {
          options.invalidateOnSuccess.forEach((key) => {
            const queryKey = Array.isArray(key) ? key : [key];
            queryClient.invalidateQueries({ queryKey });
          });
        }
        if (options.onSuccess) {
          options.onSuccess(data, variables, context);
        }
      },
    });
  };
}
