/**
 * Exclude keys from user
 *
 * @param {Record<string, unknown>} entity
 * @param {string[]} keys
 * @returns {Record<string, unknown>}
 */
const excludeFields = (entity, keys) => {
  if (!keys) {
    return entity
  }

  return Object.keys(entity).reduce((result, key) => {
    if (!keys.includes(key)) {
      result[key] = entity[key]
    }

    return result
  }, {})
}

export default excludeFields
