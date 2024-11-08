/**
 * Pick specified fields from a JSON Schema.
 *
 * @param {Object} schema - The original JSON Schema object.
 * @param {string[]} fields - Array of field names to include in the new schema.
 * @returns {Object} - A new schema object containing only the specified fields.
 */
export const pick = (schema, fields) => {
  const newSchema = JSON.parse(JSON.stringify(schema))

  newSchema.properties = Object.fromEntries(
    Object.entries(newSchema.properties).filter(([key]) => fields.includes(key))
  )

  if (newSchema.required) {
    newSchema.required = newSchema.required.filter(field => fields.includes(field))
  }

  return newSchema
}
