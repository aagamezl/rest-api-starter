/**
 *
 * @param {import('@sinclair/typebox').TObject} schema
 * @param {string} description
 * @returns {}
 */
export const createSchema = (schema, description) => {
  return Object.assign({}, schema, { description })
}
