import { and, count, eq, getTableName, isNull, sql } from 'drizzle-orm'

import { dataSource } from '../../data-source.js'
import { generateReturning, queryBuilder } from '../../common/index.js'
import { config } from '../../../config/index.js'

/**
 * A utility type that flattens and simplifies complex types to make them more readable.
 *
 * @template T
 * @typedef {T extends object ? { [K in keyof T]: T[K] } & {} : T} Prettify
 *
 * @example
 * // Usage example:
 * // @type {Prettify<{a: string} & {b: number}>}
 * // const obj = { a: 'hello', b: 42 }; // obj will have the type { a: string, b: number }
 */

/**
 * @typedef {Object.<string, any>} FilterCriteria
 * A flexible structure for filter criteria allowing any field or value, adhering to JSON:API query expressions.
 */

/**
 * @typedef {Object} FilterData
 * @property {FilterCriteria} [like] - Conditions for LIKE filters, with flexible fields.
 * @property {FilterCriteria} [not] - Conditions for NOT filters, with flexible fields.
 * @property {FilterCriteria} [lt] - Conditions for less-than filters, with flexible fields.
 * @property {FilterCriteria} [lte] - Conditions for less-than-or-equal filters, with flexible fields.
 * @property {FilterCriteria} [gt] - Conditions for greater-than filters, with flexible fields.
 * @property {FilterCriteria} [gte] - Conditions for greater-than-or-equal filters, with flexible fields.
 * @property {FilterCriteria} [custom] - General custom conditions, allowing any field-value pair.
 */

/**
 * @typedef {Object} QueryData
 * @property {Array<string>} [include] - List of related resources to include.
 * @property {Object.<string, Array<string>>} [fields] - Specifies which fields to return for each resource type.
 * @property {Array<string>} [sort] - Fields to sort by, with "-" prefix for descending order.
 * @property {Object.<string, number>} [page] - Pagination details like "number" and "size".
 * @property {FilterData} [filter] - Flexible filtering criteria for queries.
 */

/**
 * @typedef {Object} RequestData
 * @property {string} resourceType - Type of resource being queried, e.g., "article".
 * @property {string} identifier - Unique identifier for querying a specific record.
 * @property {boolean} [relationships=false] - Whether to include related resources.
 * @property {string|null} [relationshipType=null] - Type of relationship to include if applicable.
 * @property {QueryData} queryData - Query parameters, including filters, sorting, pagination, etc.
 */

/**
 * @typedef {import("drizzle-orm/pg-core").TableConfig} Schema
 */

/**
 * @typedef {Object.<string, function>} ExtraMethods
 * An optional object containing additional methods to extend the base controller functionality.
 */

/**
 * @typedef {Payload} Payload
 */

/**
 * @typedef {Object} EntityBaseFields
 * @property {number} id - The unique identifier of the inserted record.
 * @property {string} created_at - Timestamp when the record was created.
 * @property {string} updated_at - Timestamp when the record was last updated.
 */

/**
 * @typedef {Prettify<EntityBaseFields & Object.<string, unknown>>} Entity
 */

/**
 * @typedef {Object} GetAllResult
 * @property {Array<Entity>} data - The list of records according to filter and pagination.
 * @property {number} total - Total number of records.
 */

/**
 * @typedef {Object} Model
 * @property {(payload: Payload, excludedFields: string[]) => Promise<Entity>} create - Inserts a new record.
 * @property {(requestData: RequestData) => Promise<void>} deleteById - Deletes a record by ID.
 * @property {(requestData: RequestData) => Promise<GetAllResult>} getAll - Retrieves all records.
 * @property {(requestData: RequestData, excludedFields: string[]) => Promise<Entity>} getById - Retrieves a single record by ID.
 * @property {(id: string, payload: Payload, excludedFields: string[]) => Promise<Entity>} patch - Updates specified fields of a record.
 * @property {(id: string, payload: Payload, excludedFields: string[]) => Promise<Entity>} update - Updates a record by ID.
 * @property {ExtraMethods} extraMethods - Additional optional methods extending the controller.
 */

/**
 *
 * @param {Schema} schema
 * @param {import('../query/jsonApiQueryParser.js').JsonApiQuery} query
 * @returns
 */
const withoutDeleted = (schema, query) => {
  // return and(where, isNull(schema.deleted_at))
  query.where = and(query.where, isNull(schema.deleted_at))

  return query
}

/**
 * Base model function that provides common CRUD operations.
 *
 * @param {Schema} schema - The database table schema.
 * @param {ExtraMethods} [extraMethods={}] - Optional additional methods to extend the base model.
 * @returns {Model} An object containing common CRUD methods for the specified schema.
 */
export const baseModel = (schema, extraMethods = {}) => {
  const tableName = getTableName(schema)

  /**
   * Inserts a new record into the table.
   *
   * @param {Payload} payload - The data to insert.
   * @param {string[]} [excludedFields=[]] - Fields to exclude from the returning result.
   * @returns {Promise<Entity>} The inserted record data.
   */
  const create = async (payload, excludedFields = []) => {
    return dataSource.getInstance().insert(schema).values(payload).returning(generateReturning(schema, excludedFields))
  }

  /**
   * Deletes a record by ID.
   *
   * @param {RequestData} requestData - The request data containing the identifier for the record.
   * @returns {Promise<void>} The number of records deleted.
   */
  const deleteById = (requestData) => {
    return dataSource.getInstance().delete(schema).where(eq(schema.id, requestData.identifier))
  }

  /**
   * Retrieves all records from the table.
   *
   * @param {RequestData} requestData - The request data containing filters, if any.
   * @returns {Promise<GetAllResult>} The data and total record count.
   */
  const getAll = async (requestData, excludedFields = []) => {
    const query = queryBuilder(
      schema,
      requestData,
      excludedFields,
      config.database.pagination.limit
    )

    const dbInstance = dataSource.getInstance()

    const [data, total] = await Promise.all([
      dbInstance.query[tableName].findMany(withoutDeleted(schema, query)),
      dbInstance.select({ count: count() }).from(schema).then(result => result[0].count)
    ])

    return { data, total }
  }

  /**
   * Retrieves a single record by ID.
   *
   * @param {RequestData} requestData - The request data containing the identifier.
   * @param {string[]} [excludedFields=[]] - Fields to exclude from the query result.
   * @returns {Promise<Entity>} The record data.
   */
  const getById = (id, excludedFields = []) => {
    return dataSource.getInstance().query[tableName].findFirst({
      where: withoutDeleted(schema, eq(schema.id, id))
    })
    // return dataSource.getInstance().query[tableName].findFirst(
    //   withoutDeleted(schema, query)
    // )
  }

  /**
   * Updates specified fields of a record by ID.
   *
   * @param {string} id - The ID of the record to update.
   * @param {Payload} payload - The fields to update.
   * @param {string[]} [excludedFields=[]] - Fields to exclude from the returning result.
   * @returns {Promise<Entity>} The updated record data.
   */
  const patch = (id, payload, excludedFields = []) => {
    return dataSource
      .getInstance()
      .update(schema)
      .set({
        ...payload,
        updated_at: sql`now()`
      })
      .where(withoutDeleted(schema, eq(schema.id, id)))
      .returning()
  }

  /**
   * Updates a record by ID.
   *
   * @param {string} id - The ID of the record to update.
   * @param {Payload} payload - The fields to update.
   * @param {string[]} [excludedFields=[]] - Fields to exclude from the returning result.
   * @returns {Promise<Entity>} The updated record data.
   */
  const update = (id, payload, excludedFields = []) => {
    return patch(id, payload, excludedFields)
  }

  return {
    create,
    deleteById,
    getAll,
    getById,
    patch,
    update,
    ...extraMethods
  }
}
