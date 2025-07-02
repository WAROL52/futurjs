export type DbApiServerProps = {
  modelName: string;
  methodName: string;
  args: Record<string, any>;
};
export type DbServer = {
  [modelName: string]: {
    [methodName: string]: ((args: any) => any) | ((args?: any) => any);
  };
};

export function createDbApiServer<T extends DbServer>(dbServer: T) {
  return {
    handleRequest: async (props: DbApiServerProps) => {
      const { modelName, methodName, args } = props;

      if (!modelName || !methodName) {
        throw new Error("Model name and method name must be provided.");
      }
      if (typeof modelName !== "string" || typeof methodName !== "string") {
        throw new Error("Model name and method name must be strings.");
      }
      if (args && (typeof args !== "object" || Array.isArray(args))) {
        throw new Error("Args must be an object.");
      }
      if (/^[a-zA-Z0-9_]+$/.test(modelName) === false) {
        throw new Error("Model name contains invalid characters.");
      }
      if (/^[a-zA-Z0-9_]+$/.test(methodName) === false) {
        throw new Error("Method name contains invalid characters.");
      }
      if (!(modelName in dbServer)) {
        throw new Error(`Model ${modelName} does not exist on the server.`);
      }

      const model = dbServer[modelName];

      if (!(methodName in model)) {
        throw new Error(
          `Method ${methodName} does not exist on model ${modelName}.`
        );
      }

      const method = model[methodName];

      if (typeof method !== "function") {
        throw new Error(
          `${methodName} is not a function on model ${modelName}.`
        );
      }
      try {
        return {
          data: await method(args),
        };
      } catch (error) {
        return {
          error: String(error),
        };
      }
    },
  };
}
