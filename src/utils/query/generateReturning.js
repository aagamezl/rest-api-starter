/**
 * Exclude keys from entity
 *
 * @param {Record<string, unknown>} entity
 * @param {string[]} [excludedFields=[]]
 * @returns {Record<string, unknown>}
 */
const generateReturning = (entity, excludedFields = []) => {
  // if (excludedFields.length === 0) {
  //   return entity
  // }

  return Object.keys(entity).reduce((result, key) => {
    if (!excludedFields.includes(key)) {
      result[key] = entity[key]
    }

    return result
  }, {})
}

export default generateReturning
