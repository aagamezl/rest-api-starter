/**
 *
 * @param {import('@sinclair/typebox').TObject} schema
 * @param {string} description
 * @returns {}
 */
const createSchema = (schema, description) => {
  return Object.assign({}, schema, { description })
}

export default createSchema
