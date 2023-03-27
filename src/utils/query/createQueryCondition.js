/**
 *
 * @param {string} entity
 * @param {object} requestData
 * @returns
 */
export const createQueryCondition = (entity, requestData) => {
  const queryCondition = {}

  if (haveData(requestData.queryData.fields)) {
    queryCondition.select = {}

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

const getFieldsQuery = (fields) => {
  return fields.reduce((result, field) => {
    result[field] = true

    return result
  }, { id: true })
}

const haveData = (target) => Object.keys(target).length > 0
