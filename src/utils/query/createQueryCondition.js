/**
 *
 * @param {string} entity
 * @param {object} requestData
 * @returns
 */
export const createQueryCondition = (entity, requestData) => {
  const queryCondition = {}

  if (haveData(requestData.queryData.fields)) {
    queryCondition.columns = {}

    Object.entries(requestData.queryData.fields).reduce((query, [relation, fields]) => {
      if (entity === relation) {
        query.columns = getFieldsQuery(fields)
      } else {
        query.columns.with = {
          [relation]: { columns: getFieldsQuery(fields) }
        }
      }

      return query
    }, queryCondition)
  }

  return queryCondition
}

export const getFieldsQuery = (fields) => {
  return fields.reduce((result, field) => {
    result[field] = true

    return result
  }, { id: true })
}

const haveData = (target) => Object.keys(target).length > 0
