/**
 * Omit specified fields from a JSON Schema.
 *
 * @param {Object} schema - The original JSON Schema object.
 * @param {string[]} fields - Array of field names to omit from the schema.
 * @returns {Object} - A new schema object with the specified fields omitted.
 */
export const omit = (schema, fields) => {
  // Clone the schema to avoid modifying the original object
  const newSchema = JSON.parse(JSON.stringify(schema))

  // Remove specified fields from the properties
  for (const field of fields) {
    delete newSchema.properties[field]
  }

  // Update the 'required' array to exclude any removed fields
  if (newSchema.required) {
    newSchema.required = newSchema.required.filter(field => !fields.includes(field))
  }

  return newSchema
}
