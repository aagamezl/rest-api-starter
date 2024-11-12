import { asc, desc } from 'drizzle-orm'

/**
 * JSON:API Page
 *
 * @typedef QueryDataPage
 * @type {object}
 * @property {string} limit
 * @property {string} offet
 */

/**
 * Page
 *
 * @typedef Page
 * @type {object}
 * @property {number} limit
 * @property {number} offet
 */

const haveData = (target) => Object.keys(target).length > 0

const getFieldsQuery = (fields) => {
  return fields.reduce((result, field) => {
    result[field] = true

    return result
  }, { /* id: true */ })
}

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

/**
 *
 * @param {QueryDataPage} page
 * @returns {Page}
 */
export const getPagination = (page, paginationlimit) => {
  const { offset, limit } = page

  return {
    offset: Number(offset ?? 0),
    limit: Number(limit ?? paginationlimit)
  }
}

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
        query.columns[relation] = {
          columns: getFieldsQuery(fields)
        }
      }

      return query
    }, queryCondition)
  }

  return queryCondition
}

export const parseRelations = (include) => {
  return include.reduce((relations, relation) => {
    const currentRelation = relation.split('.')

    if (currentRelation.length > 1) {
      relations[currentRelation[0]] = { with: parseRelations(currentRelation.slice(1)) }
    } else {
      relations[relation] = true
    }

    return relations
  }, {})
}

export const queryBuilder = (schema, requestData, excludedFields = [], paginationlimit) => {
  if (!requestData) {
    return {}
  }

  const modelName = requestData.resourceType
  const query = createQueryCondition(modelName, requestData)
  const { offset, limit } = getPagination(requestData.queryData.page, paginationlimit)

  query.columns = excludeFields(query.columns, excludedFields)

  if (requestData.identifier) {
    query.where = { id: schema.id }
  } else {
    query.skip = offset
    query.take = limit
  }

  if (requestData.queryData.sort.length > 0) {
    query.orderBy = requestData.queryData.sort.reduce((orderBy, field) => {
      if (field.startsWith('-')) {
        orderBy.push(desc(schema[field.slice(1)].id))
      } else {
        orderBy.push({
          [field]: asc(schema[field].id)
        })
      }

      return orderBy
    }, [])
  }

  if (requestData.queryData.include.length > 0) {
    query.with = query.with = parseRelations(requestData.queryData.include)
  }

  return query
}
