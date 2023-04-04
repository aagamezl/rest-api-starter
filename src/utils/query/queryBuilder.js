import { Prisma } from '@prisma/client'
import { capitalize, singular } from '@devnetic/utils'

import { createQueryCondition } from './createQueryCondition.js'
import { excludeFields } from './excludeFields.js'
import { getPagination } from './getPagination.js'
import { scalarEnumToFields } from './scalarEnumToFields.js'

/**
 * Type alias for sort order.
 *
 * @typedef {('asc' | 'desc')} SortOrder
 */

/**
 * Represents a type that can be either a single value or an array of values.
 * @typedef {T | Array<T>} Enumerable<T>
 * @template T
 */

/**
 * Represents a filter for date-time values.
 * @typedef {Object} NestedFilter
 * @property {Date | string} [equals] - The value to match exactly.
 * @property {Enumerable<Date> | Enumerable<string>} [in] - The values to match any of.
 * @property {Enumerable<Date> | Enumerable<string>} [notIn] - The values to exclude.
 * @property {Date | string} [lt] - The value to match less than.
 * @property {Date | string} [lte] - The value to match less than or equal to.
 * @property {Date | string} [gt] - The value to match greater than.
 * @property {Date | string} [gte] - The value to match greater than or equal to.
 * @property {NestedFilter | Date | string} [not] - The negated filter condition.
 */

/**
 * Represents a where input.
 *
 * @typedef {Object} WhereInput
 * @property {Enumerable<WhereInput>} [AND] - The AND condition.
 * @property {Enumerable<WhereInput>} [OR] - The OR condition.
 * @property {Enumerable<WhereInput>} [NOT] - The NOT condition.
 * @property {NestedFilter | string} [id] - The ID filter.
 * @property {StringFilter | string} [firstname] - The first name filter.
 * @property {StringFilter | string} [lastname] - The last name filter.
 * @property {StringFilter | string} [password] - The password filter.
 * @property {StringFilter | string} [email] - The email filter.
 * @property {IntNullableFilter | number | null} [age] - The age filter.
 * @property {NestedFilter | Date | string} [createdAt] - The creation date filter.
 * @property {NestedFilter | Date | string} [updatedAt] - The update date filter.
 */

/**
 * Represent the Request Data for an JSON API URL
 *
 * @typedef Query
 * @type {object}
 * @property {Object.<string, boolean>} select - Indicates the total amount of record for the resource.
 * @property {WhereInput} where - Indicates the total amount of record for the resource.
 * @property {number} skip - Indicates the total amount of records to skip.
 * @property {number} take - Indicates the total amount of records to take.
 * @property {Object.<string, SortOrder>} orderBy - Indicates the total amount of records to take.
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
  const { number, size } = getPagination(requestData.queryData.page)

  query.select = excludeFields(
    query.select ?? scalarEnumToFields(Prisma[`${capitalize(modelName)}ScalarFieldEnum`]),
    excludedFields
  )

  if (requestData.identifier) {
    query.where = {
      id: requestData.identifier
    }
  } else {
    query.skip = number
    query.take = size
  }

  query.orderBy = requestData.queryData.sort.reduce((orderBy, field) => {
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

  return query
}
