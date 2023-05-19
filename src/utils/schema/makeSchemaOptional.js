/**
 *
 * @param {import('joi').ObjectSchema} schema
 * @returns {import('joi').ObjectSchema}
 */
export const makeSchemaOptional = (schema) => {
  const keys = Object.keys(schema.describe().keys)

  return schema.fork(keys, (schema) => schema.optional())
}
