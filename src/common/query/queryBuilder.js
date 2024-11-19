import { asc, desc, getTableColumns } from 'drizzle-orm'

/**
 * @typedef {Array<Function>} OrderByClause
 */

/**
 * @typedef {Object} Query
 * @property {number} [offset] - The offset for pagination, determined by the `offset` from pagination settings.
 * @property {number} [limit] - The limit for pagination, determined by `limit` or `paginationlimit`.
 * @property {OrderByClause} [orderBy] - Array of order-by clauses for sorting, based on `sort` parameters.
 */

/**
 * Exclude keys from user
 *
 * @param {Record<string, unknown>} entity
 * @param {string[]} keys
 * @returns {Record<string, unknown>}
 */
export const excludeFields = (entityColumns, keys) => {
  return entityColumns.reduce((result, key) => {
    if (!keys.includes(key)) {
      result[key] = true
    }

    return result
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
export const queryBuilder = (schema, requestData, excludedFields = [], paginationLimit) => {
  if (!requestData) {
    return {}
  }

  const query = {
    limit: requestData.limit ?? paginationLimit,
    offset: requestData.offset
  }

  query.columns = excludeFields(Object.keys(getTableColumns(schema)), excludedFields)

  if (requestData.sort.length > 0) {
    query.orderBy = requestData.sort.reduce((orderBy, field) => {
      if (field.startsWith('-')) {
        orderBy.push(desc(schema[field.slice(1)]))
      } else {
        orderBy.push(asc(schema[field]))
      }

      return orderBy
    }, [])
  }

  return query
}
