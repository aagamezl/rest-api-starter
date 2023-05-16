// @ts-check

import { Prisma } from '@prisma/client'
import { capitalize, singular } from '@devnetic/utils'

import { createQueryCondition } from './createQueryCondition.js'
import { excludeFields } from './excludeFields.js'
import { getPagination } from './getPagination.js'
import { scalarEnumToFields } from './scalarEnumToFields.js'

/**
 * Represents a filter for date-time values.
 * @typedef {Object} NestedFilter
 * @property {Object.<string, Date|string>} [propName] - Additional properties with values
 * @property {Date | string} [equals] - The value to match exactly.
 * @property {Prisma.Enumerable<Date> | Prisma.Enumerable<string>} [in] - The values to match any of.
 * @property {Prisma.Enumerable<Date> | Prisma.Enumerable<string>} [notIn] - The values to exclude.
 * @property {Date | string} [lt] - The value to match less than.
 * @property {Date | string} [lte] - The value to match less than or equal to.
 * @property {Date | string} [gt] - The value to match greater than.
 * @property {Date | string} [gte] - The value to match greater than or equal to.
 * @property {Prisma.DateTimeFilter | Date | string} [not] - The negated filter condition.
 */

/**
 * Represents the input for a "where" condition.
 *
 * @typedef {Object} WhereInput
 * @property {string} [AND] - The logical "AND" condition.
 * @property {string} [OR] - The logical "OR" condition.
 * @property {string} [NOT] - The logical "NOT" condition.
 * @property {Prisma.UuidFilter | string} [id] - The ID of the entity.
 * @property {Object.<string, Date|string>} [propName] - Additional properties with unknown values.
 * @property {Date|string} [createdAt] - The creation date of the entity.
 * @property {Date|string} [updatedAt] - The last update date of the entity.
 */

/**
 * @typedef {Object.<string, boolean>} Select
 */

/**
 * @typedef {Object.<string, Prisma.SortOrder>[]} OrderBy
 */

/**
 * Represent the Request Data for an JSON API URL
 *
 * @typedef Query
 * @type {object}
 * @property {Select} [select] - Indicates the total amount of record for the resource.
 * @property {WhereInput} [where] - Indicates the total amount of record for the resource.
 * @property {number} [skip] - Indicates the total amount of records to skip.
 * @property {number} [take] - Indicates the total amount of records to take.
 * @property {OrderBy} [orderBy] - Indicates the total amount of records to take.
 */

/**
 *
 * @param {import('./requestParser.js').RequestData} requestData
 * @param {string[]} excludedFields
 * @returns {Query}
 */
export const queryBuilder = (requestData, excludedFields = []) => {
  if (!requestData) {
    return {}
  }

  const modelName = singular(requestData.resourceType)
  const query = createQueryCondition(modelName, requestData)
  const { offset, limit } = getPagination(requestData.queryData.page)

  query.select = excludeFields(
    query.select ?? scalarEnumToFields(Prisma[`${capitalize(modelName)}ScalarFieldEnum`]),
    excludedFields
  )

  if (requestData.identifier) {
    query.where = {
      id: requestData.identifier
    }
  } else {
    query.skip = offset
    query.take = limit
  }

  if (requestData.queryData.sort.length > 0) {
    query.orderBy = requestData.queryData.sort.reduce((/** @type {OrderBy} */orderBy, field) => {
      if (field.startsWith('-')) {
        orderBy.push({
          [field.slice(1)]: 'desc'
        })
      } else {
        orderBy.push({
          [field]: 'asc'
        })
      }

      return orderBy
    }, [])
  }

  return query
}
