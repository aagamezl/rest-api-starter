import { eq, sql } from 'drizzle-orm'

import dataSource from '../../data-source.js'
import { generateReturning, queryBuilder } from '../../utils/index.js'
import { users } from './users.schema.js'

/**
 *
 * @param {Record<string, unknown>} payload
 * @returns {Promise<import('../../data-source.js').SingleResponse}
 */
export const create = async (payload, excludedFields = []) => {
  return dataSource.getInstance().insert(users).values(payload).returning(generateReturning(users, excludedFields))
}

/**
 *
 * @param {import('../../utils/query/requestParser.js').RequestData} requestData
 * @returns {Promise<import('../../data-source.js').SingleResponse}
 */
export const deleteById = (requestData) => {
  return dataSource.getInstance().delete(users).where(eq(users.id, requestData.identifier))
}

/**
 *
 * @param {import('../../utils/query/requestParser.js').RequestData} requestData
 * @returns {Promise<import('../../data-source.js').GetAllResponse>}
 */
export const getAll = async (requestData) => {
  const query = queryBuilder(requestData)

  const data = await dataSource.getInstance().query.users.findMany(query)

  return { data }
}

/**
 *
 * @param {import('../../utils/query/requestParser.js').RequestData} requestData
 * @returns {Promise<import('../../data-source.js').SingleResponse}
 */
export const getById = (requestData, excludedFields = []) => {
  const query = queryBuilder(users, requestData, excludedFields)

  return dataSource.getInstance().query.users.findFirst(query)
}

/**
 *
 * @param {string} id
 * @param {Record<string, unknown>} payload
 * @returns {Promise<import('../../data-source.js').SingleResponse}
 */
export const patch = (id, payload, excludedFields = []) => {
  payload.updatedAt = sql`now()`

  return dataSource.getInstance().update(users)
    .set(payload)
    .where(eq(users.id, id))
    .returning(generateReturning(excludedFields))
}

export default {
  create,
  deleteById,
  getAll,
  getById,
  patch
}
