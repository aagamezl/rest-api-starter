/**
 * Exclude keys from user
 *
 * @param {Record<string, unknown>} entity
 * @param {string[]} keys
 * @returns {Record<string, unknown>}
 */
export const excludeFields = (entity, keys) => {
  return Object.keys(entity).reduce((result, key) => {
    if (!keys.includes(key)) {
      result[key] = entity[key]
    }

    return result
  }, {})
}
