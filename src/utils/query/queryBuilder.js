import { asc, desc, eq } from 'drizzle-orm'

import { createQueryCondition, getFieldsQuery } from './createQueryCondition.js'
import excludeFields from './excludeFields.js'
import getPagination from './getPagination.js'
// import { scalarEnumToFields } from './scalarEnumToFields.js'

/**
 * Represents a type that can be either a single value or an array of values.
 * @typedef {T | Array<T>} Enumerable<T>
 * @template T
 */

/**
 * Represents a type that can be either a single value or an array of values.
 * @typedef {import('drizzle-orm').Column | import('drizzle-orm').SQL |  import('drizzle-orm').SQL.Aliased} OrderBy
 */

/**
 * Represent a nested select
 *
 * @typedef {object} Select
 * @property {Object.<string, boolean | Select>} select
 */

/**
 * Represent the Request Data for an JSON API URL
 *
 * @typedef Query
 * @type {object}
 * @property {Object.<string, boolean | Select>} select - Indicates the total amount of record for the resource.
 * @property {import('drizzle-orm').SQL} where - Indicates the total amount of record for the resource.
 * @property {number} offset - Indicates the total amount of records to skip.
 * @property {number} limit - Indicates the total amount of records to take.
 * @property {OrderBy[]} orderBy - Indicates the total amount of records to take.
 */

/**
 *
 * @param {import('drizzle-orm').Table} model
 * @param {import('./requestParser.js').RequestData} requestData
 * @param {string[]} excludedFields
 * @returns {Query}
 */
const queryBuilder = (model, requestData, excludedFields) => {
  if (!requestData) {
    return {}
  }

  const modelName = requestData.resourceType
  const query = createQueryCondition(modelName, requestData)

  query.columns ??= getFieldsQuery(Object.keys(model))

  query.columns = excludeFields(query.columns, excludedFields)

  /**
   * identifier is the entity id from get by id, delete, update, for example in
   * the route /users/123, identifier will be 123
  */
  if (requestData.identifier) {
    query.where = eq(model.id, requestData.identifier)
  } else {
    const { offset, limit } = getPagination(requestData.queryData.page)

    query.offset = offset
    query.limit = limit
  }

  if (requestData.queryData.sort.length > 0) {
    query.orderBy = requestData.queryData.sort.reduce((orderBy, field) => {
      if (field.startsWith('-')) {
        orderBy.push(desc(model[field.slice(1)]))
      } else {
        orderBy.push(asc(model[field]))
      }

      return orderBy
    }, [])
  }

  return query
}

export default queryBuilder
