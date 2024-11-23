/**
 * Convert all required fields in a JSON Schema to optional fields.
 *
 * @param {Object} schema - The original JSON Schema object.
 * @returns {Object} - A new schema object with all required fields made optional.
 */
export const partial = (schema) => {
  const newSchema = JSON.parse(JSON.stringify(schema))

  // Remove the required array to make all fields optional
  delete newSchema.required

  return newSchema
}
