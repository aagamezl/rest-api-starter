/**
 *
 * @param {ObjectSchema} schema
 * @returns {ObjectSchema}
 */
export const makeSchemaOptional = (schema) => {
  const keys = Object.keys(schema.describe().keys)

  return schema.fork(keys, (schema) => schema.optional())
}
