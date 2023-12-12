/**
 *
 * @param {string} entity
 * @param {object} requestData
 * @returns
 */
export const createQueryCondition = (entity, requestData) => {
  const queryCondition = {}

  requestData.queryData.include.reduce((query, relation) => {
    if (requestData.queryData.fields[relation]) {
      query.with = {
        [relation]: { columns: getFieldsQuery(requestData.queryData.fields[relation]) }
      }
    } else {
      query.with = {
        [relation]: true
      }
    }

    return query
  }, queryCondition)

  Object.keys(requestData.queryData.fields).reduce((query, relation) => {
    if (!requestData.queryData.include.includes(relation)) {
      query[relation] = { columns: getFieldsQuery(requestData.queryData.fields[relation]) }
    }

    return query
  }, queryCondition)

  return queryCondition
}

export const getFieldsQuery = (fields) => {
  return fields.reduce((result, field) => {
    result[field] = true

    return result
  }, { id: true })
}
