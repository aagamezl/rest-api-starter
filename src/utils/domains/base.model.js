/**
 *
 * @param {import("drizzle-orm/pg-core").TableConfig} schema
 * @param {*} extraMethods
 * @returns
 */
export const baseModel = (schema, extraMethods = {}) => {
  console.log(schema.name)

  return {
    ...extraMethods
  }
}
