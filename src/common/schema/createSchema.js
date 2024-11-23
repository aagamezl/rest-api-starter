/**
 *
 * @param {object} schema // TODO: create correct type
 * @param {string} description
 * @returns {object} // TODO: create correct type
 */
export const createSchema = (schema, description) => {
  return Object.assign({}, schema, { description })
}
