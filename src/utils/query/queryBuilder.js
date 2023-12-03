import { Prisma } from '@prisma/client'
import { capitalize, singular } from '@devnetic/utils'

import { createQueryCondition } from './createQueryCondition.js'
import { excludeFields } from './excludeFields.js'
import { getPagination } from './getPagination.js'
import { scalarEnumToFields } from './scalarEnumToFields.js'

/**
 * Represents a type that can be either a single value or an array of values.
 * @typedef {T | Array<T>} Enumerable<T>
 * @template T
 */

/**
 * Represents a filter for date-time values.
 * @typedef {Object} NestedFilter
 * @property {Date | string} [equals] - The value to match exactly.
 * @property {Enumerable<Date> | Prisma.Enumerable<string>} [in] - The values to match any of.
 * @property {Prisma.Enumerable<Date> | Prisma.Enumerable<string>} [notIn] - The values to exclude.
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
 * @property {Prisma.Enumerable<WhereInput>} [AND] - The AND condition.
 * @property {Prisma.Enumerable<WhereInput>} [OR] - The OR condition.
 * @property {Prisma.Enumerable<WhereInput>} [NOT] - The NOT condition.
 * @property {NestedFilter | string} [id] - The ID filter.
 * @property {Prisma.StringFilter | string} [firstname] - The first name filter.
 * @property {Prisma.StringFilter | string} [lastname] - The last name filter.
 * @property {Prisma.StringFilter | string} [password] - The password filter.
 * @property {Prisma.StringFilter | string} [email] - The email filter.
 * @property {Prisma.IntNullableFilter | number | null} [age] - The age filter.
 * @property {NestedFilter | Date | string} [createdAt] - The creation date filter.
 * @property {NestedFilter | Date | string} [updatedAt] - The update date filter.
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
 * @property {WhereInput} where - Indicates the total amount of record for the resource.
 * @property {number} skip - Indicates the total amount of records to skip.
 * @property {number} take - Indicates the total amount of records to take.
 * @property {Object.<string, Prisma.SortOrder>} orderBy - Indicates the total amount of records to take.
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
  }

  return query
}
