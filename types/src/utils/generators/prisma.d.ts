export function seed(): string;
export function createValidations(schema?: Prisma.DMMF.Datamodel, schemaFields?: string[]): any[];
export function generateSchema(schema: Prisma.DMMF.Datamodel, schemaFields?: string[]): object;
import { Prisma } from ".prisma/client";
