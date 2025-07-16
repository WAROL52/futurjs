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

export type FnHookQuery<
  T,
  R,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = never
> = (
  dbClient: T,
  context: QueryFunctionContext<TQueryKey, TPageParam>
) => R | Promise<R>;

export type UseHookQueryOptions<T, R, TQueryKey extends QueryKey = QueryKey> = {
  queryFn: FnHookQuery<T, R, TQueryKey>;
} & Omit<UseQueryOptions<R, DefaultError, R, TQueryKey>, "queryFn">;

export type FnHookMutation<T, TData = unknown, TVariables = unknown> = (
  variables: TVariables,
  dbClient: T
) => Promise<TData>;

export type UseHookMutationOptions<
  T,
  R,
  TVariables = unknown,
  TContext = unknown
> = {
  mutationFn: FnHookMutation<T, R, TVariables>;
  invalidateOnSuccess?: QueryKey[];
} & Omit<
  UseMutationOptions<R, DefaultError, TVariables, TContext>,
  "mutationFn"
>;
export type FnActionHandler = ((args: any) => any) | ((args?: any) => any);
export type ActionHandler = {
  [modelName: string]: {
    [methodName: string]: FnActionHandler;
  };
};

export function createQueryHook<T extends ActionHandler>(handler: T) {
  return {
    useActionQuery: createUseActionQuery<T>(handler),
    useActionMutation: createUseActionMutation<T>(handler),
  };
}
createQueryHook.dependencies = ["@tanstack/react-query"];

function createUseActionQuery<T extends object>(handler: T) {
  return function useDbQuery<R, TQueryKey extends QueryKey = QueryKey>(
    options: UseHookQueryOptions<T, R, TQueryKey>
  ) {
    return useQuery({
      ...options,
      queryFn: (context) => options.queryFn(handler, context),
    });
  };
}

function createUseActionMutation<T extends object>(handler: T) {
  return function useDbMutation<R, TVariables = unknown, TContext = unknown>(
    options:
      | UseHookMutationOptions<T, R, TVariables, TContext>
      | ((db: T) => UseHookMutationOptions<T, R, TVariables, TContext>)
  ) {
    const queryClient = useQueryClient();
    if (typeof options === "function") {
      options = options(handler);
    }
    return useMutation({
      ...options,
      mutationFn: (variables) => options.mutationFn(variables, handler),
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

export function createReducerQueryHook<
  T extends object,
  K extends string,
  F extends Function
>(
  action: T,
  func: (option: {
    action: T;
    useQuery: typeof useQuery;
    useMutation: typeof useMutation;
  }) => Record<K, F>
) {
  return func({
    action,
    useMutation,
    useQuery,
  });
}
