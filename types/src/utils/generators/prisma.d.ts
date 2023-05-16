export function seed(): string;
export function createValidations(schema?: Prisma.DMMF.Datamodel, schemaFields?: any[]): any[];
export function generateSchema(schema: any, schemaFields?: any[]): object;
import { Prisma } from ".prisma/client";
