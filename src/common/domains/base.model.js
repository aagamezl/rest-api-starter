import { eq, getTableName, sql } from 'drizzle-orm'

import { dataSource } from '../../data-source.js'
import { generateReturning, queryBuilder } from '../../common/index.js'

/**
 *
 * @param {import("drizzle-orm/pg-core").TableConfig} schema
 * @param {*} extraMethods
 * @returns
 */
export const baseModel = (schema, extraMethods = {}) => {
  // console.log(schema.name)
  const tableName = getTableName(schema)

  /**
   *
   * @param {Record<string, unknown>} payload
   * @returns {Promise<import('../../data-source.js').SingleResponse}
   */
  const create = async (payload, excludedFields = []) => {
    return dataSource.getInstance().insert(schema).values(payload).returning(generateReturning(schema, excludedFields))
  }

  /**
   *
   * @param {import('../../utils/query/requestParser.js').RequestData} requestData
   * @returns {Promise<import('../../data-source.js').SingleResponse}
   */
  const deleteById = (requestData) => {
    return dataSource.getInstance().delete(schema).where(eq(schema.id, requestData.identifier))
  }

  /**
   *
   * @param {import('../../utils/query/requestParser.js').RequestData} requestData
   * @returns {Promise<import('../../data-source.js').GetAllResponse>}
   */
  const getAll = async (requestData) => {
    // const query = queryBuilder(requestData)

    const data = await dataSource.getInstance().query[tableName].findMany()

    return { data }
  }

  /**
   *
   * @param {import('../../utils/query/requestParser.js').RequestData} requestData
   * @returns {Promise<import('../../data-source.js').SingleResponse}
   */
  const getById = (requestData, excludedFields = []) => {
    const query = queryBuilder(schema, requestData, excludedFields)

    return dataSource.getInstance().query[tableName].findFirst(query)
  }

  /**
   *
   * @param {string} id
   * @param {Record<string, unknown>} payload
   * @returns {Promise<import('../../data-source.js').SingleResponse}
   */
  const patch = (id, payload, excludedFields = []) => {
    return dataSource
      .getInstance()
      .update(schema)
      .set({
        ...payload,
        updatedAt: sql`now()`
      })
      .where(eq(schema.id, id))
      .returning(generateReturning(excludedFields))
  }

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
