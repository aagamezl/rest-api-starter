// @ts-check

/**
 * Exclude keys from user
 *
 * @param {Object.<string, unknown>} entity
 * @param {string[]} keys
 * @returns {import("./queryBuilder").Select}
 */
export const excludeFields = (entity, keys) => {
  return Object.keys(entity).reduce((result, key) => {
    if (!keys.includes(key)) {
      result[key] = entity[key]
    }

    return result
  }, {})
}
