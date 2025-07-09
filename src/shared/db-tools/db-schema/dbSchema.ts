import {
  datamodelToPrismaFormEnums,
  datamodelToPrismaFormModel,
  datamodelToXyflow,
} from "@/shared/prisma/hooks/use-prisma-schema";
import { datamodel } from "../../../generated/datamodel";

export const dbEnums = datamodelToPrismaFormEnums(datamodel);
export const dbModel = datamodelToPrismaFormModel(datamodel, dbEnums);
export const xyflow = datamodelToXyflow(datamodel);

export const dbSchema = {
  models: dbModel,
  enums: dbEnums,
  xyflow,
};
