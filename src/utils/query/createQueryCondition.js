// @ts-check

/**
 *
 * @param {string} entity
 * @param {import('./requestParser.js').RequestData} requestData
 * @returns {import('./queryBuilder').Query}
 */
export const createQueryCondition = (entity, requestData) => {
  const queryCondition = {}

  if (haveData(requestData.queryData.fields)) {
    Object.entries(requestData.queryData.fields).reduce((query, [relation, fields]) => {
      if (entity === relation) {
        query.select = getFieldsQuery(fields)
      } else {
        query.select[relation] = {
          select: getFieldsQuery(fields)
        }
      }

      return query
    }, queryCondition)
  }

  return queryCondition
}

/**
 *
 * @param {string[]} fields
 * @returns {import('./queryBuilder.js').Select}
 */
const getFieldsQuery = (fields) => {
  return fields.reduce((result, field) => {
    result[field] = true

    return result
  }, { id: true })
}

/**
 *
 * @param {Object.<string, unknown>} target
 * @returns {boolean}
 */
const haveData = (target) => Object.keys(target).length > 0
