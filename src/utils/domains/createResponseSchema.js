/**
 *
 * @param {import('@sinclair/typebox').TObject} schema
 * @param {string} description
 * @returns {}
 */
const createResponseSchema = (schema, description) => {
  return Object.assign({}, schema, { description })
}

export default createResponseSchema
