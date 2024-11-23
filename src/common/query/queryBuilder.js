import { asc, desc, eq } from 'drizzle-orm'

/**
 * @typedef {Array<Function>} OrderByClause
 */

/**
 * @typedef {Object} QueryWithRelations
 * @property {Object.<string, WithRelations>} with - Nested relationships to include in the query, allowing for recursive inclusion of related entities.
 */

/**
 * @typedef {Object} WithRelations
 * @property {QueryColumns} [columns] - Specifies fields to include or exclude for the related entity, where each field name is a key and its value is a boolean.
 * @property {Object.<string, WithRelations>} [with] - Nested relationships to include for this entity, allowing recursion.
 */

/**
 * @typedef {Object.<string, boolean>} QueryColumns
 * - Defines fields to include (true) or exclude (false) for a particular entity.
 * - Example: `{ authorId: false }`
 */

/**
 * @typedef {Object} Query
 * @property {Object.<string, boolean} [columns] - Columns to select in the query, excluding any specified in `excludedFields`.
 * @property {Function} [where] - Condition for filtering by identifier if present in requestData.
 * @property {number} [offset] - The offset for pagination, determined by the `offset` from pagination settings.
 * @property {number} [limit] - The limit for pagination, determined by `limit` or `paginationlimit`.
 * @property {OrderByClause} [orderBy] - Array of order-by clauses for sorting, based on `sort` parameters.
 * @property {QueryWithRelations} [with] - Array of relationships to include in the query, based on `include` parameters.
 */

const haveData = (target) => Object.keys(target).length > 0

const getFieldsQuery = (fields) => {
  return fields.reduce((result, field) => {
    result[field] = true

    return result
  }, {})
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
 * @param {QueryPage} page
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

/**
 *
 * @param {import('../domains/index.js').Schema} schema
 * @param {import('../domains/index.js').RequestData} requestData
 * @param {string[]} excludedFields
 * @param {number} paginationlimit
 * @returns {Query}
 */
export const queryBuilder = (schema, requestData, excludedFields = [], paginationlimit) => {
  if (!requestData) {
    return {}
  }

  const modelName = requestData.resourceType
  const query = createQueryCondition(modelName, requestData)
  const { offset, limit } = getPagination(requestData.queryData.page, paginationlimit)

  if (query.columns) {
    query.columns = excludeFields(query.columns, excludedFields)
  }

  if (requestData.identifier) {
    query.where = eq(schema.id, requestData.identifier)
  } else {
    query.offet = offset
    query.limit = limit
  }

  if (requestData.queryData.sort.length > 0) {
    query.orderBy = requestData.queryData.sort.reduce((orderBy, field) => {
      if (field.startsWith('-')) {
        orderBy.push(desc(schema[field.slice(1)]))
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

// import { asc, desc, getTableColumns } from 'drizzle-orm'

// /**
//  * @typedef {Array<Function>} OrderByClause
//  */

// /**
//  * @typedef {Object} Query
//  * @property {number} [offset] - The offset for pagination, determined by the `offset` from pagination settings.
//  * @property {number} [limit] - The limit for pagination, determined by `limit` or `paginationlimit`.
//  * @property {OrderByClause} [orderBy] - Array of order-by clauses for sorting, based on `sort` parameters.
//  */

// /**
//  * Exclude keys from user
//  *
//  * @param {Record<string, unknown>} entity
//  * @param {string[]} keys
//  * @returns {Record<string, unknown>}
//  */
// export const excludeFields = (entityColumns, keys) => {
//   return entityColumns.reduce((result, key) => {
//     if (!keys.includes(key)) {
//       result[key] = true
//     }

//     return result
//   }, {})
// }

// /**
//  *
//  * @param {import('../domains/index.js').Schema} schema
//  * @param {import('../domains/index.js').RequestData} requestData
//  * @param {string[]} excludedFields
//  * @param {number} paginationlimit
//  * @returns {Query}
//  */
// export const queryBuilder = (schema, requestData, excludedFields = [], paginationLimit) => {
//   if (!requestData) {
//     return {}
//   }

//   const query = {
//     limit: requestData?.limit ?? paginationLimit,
//     offset: requestData?.offset
//   }

//   query.columns = excludeFields(Object.keys(getTableColumns(schema)), excludedFields)

//   if (requestData?.sort?.length > 0) {
//     query.orderBy = requestData.sort.reduce((orderBy, field) => {
//       if (field.startsWith('-')) {
//         orderBy.push(desc(schema[field.slice(1)]))
//       } else {
//         orderBy.push(asc(schema[field]))
//       }

//       return orderBy
//     }, [])
//   }

//   return query
// }
