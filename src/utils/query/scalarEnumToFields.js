/**
 *
 * @param {Record<string, string>} type
 * @returns {Record<string, boolean>}
 */
export const scalarEnumToFields = (type) => {
  return Object.keys(type).reduce((result, key) => {
    result[key] = true

    return result
  }, {})
}
