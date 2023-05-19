/**
 *
 * @param {Object.<string, string>} type
 * @returns {Object.<string, boolean>}
 */
export const scalarEnumToFields = (type) => {
  return Object.keys(type).reduce((result, key) => {
    result[key] = true

    return result
  }, {})
}
