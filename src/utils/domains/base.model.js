import { eq, getTableName, sql } from 'drizzle-orm'

import queryBuilder from '../query/queryBuilder.js'
import { db } from '../../data-source.js'
import generateReturning from '../query/generateReturning.js'

/**
 * @template T
 * @typedef {T extends Promise<infer U> ? U : T} UnwrapPromise
 */

/** @typedef {Promise<Record<string, unknown>>} SingleResponse */
/** @typedef {UnwrapPromise<SingleResponse>[]} GetAllResponse */

/**
 * Base Model
 *
 * @typedef Model
 * @type {object}
 *
 * @property {(payload: Record<string, unknown>) => SingleResponse} create
 * @property {(id: string) => SingleResponse} deleteById
 * @property {(requestData: import('../query/requestParser.js').RequestData) => Promise<GetAllResponse>} getAll
 * @property {(id: string, requestData: import('../query/requestParser.js').RequestData) => SingleResponse} getById
 * @property {(id: string, payload: UpdatePayload.<TEntity>) => SingleResponse} update
 */

/**
 * @typedef BaseModelOptions
 * @type {object}
 *
 * @property {Record<string, Function>} [extendedMethods={}]
 * @property {string[]} [excludedFields=[]]
 * @property {string[]} [excludeMethods=[]]
 */

/**
 *
 * @param {Record<string, unknown>} payload
 * @returns {SingleResponse}
 */
export const create = async (schema, payload, excludedFields = []) => {
  return db.insert(schema).values(payload).returning(generateReturning(schema, excludedFields))
}

/**
 *
 * @param {import('../../utils/query/requestParser.js').RequestData} requestData
 * @returns {SingleResponse}
 */
export const deleteById = (schema, requestData) => {
  return schema.delete(schema).where(eq(schema.id, requestData.identifier))
}

/**
 *
 * @param {import('../../utils/index.js').RequestData} requestData
 * @returns {Promise<import('../../data-source.js').FindAllResponse>}
 */
export const getAll = (schema, requestData) => {
  const query = queryBuilder(requestData)

  return db.query[getTableName(schema)].findMany(query).execute()
}

/**
 *
 * @param {import('../../utils/index.js').RequestData} requestData
 * @returns {Promise<Record<string, unknown>}
 */
export const getById = (schema, requestData, excludedFields = []) => {
  const query = queryBuilder(schema, requestData, excludedFields)

  return db.query[getTableName(schema)].findFirst(query)
}

/**
 *
 * @param {string} id
 * @param {Record<string, unknown>} payload
 * @returns {Promise<Record<string, unknown>}
 */
export const update = (schema, id, payload, excludedFields = []) => {
  payload.updated_at = sql`now()`

  return schema.update(schema)
    .set(payload)
    .where(eq(schema.id, id))
    .returning(generateReturning(excludedFields))
}

const createModel = (schema, methods) => {
  return Object.entries(methods).reduce((model, [name, method]) => {
    model[name] = (...args) => method(schema, ...args)

    return model
  }, {})
}

/**
 *
 * @param {import('drizzle-orm/pg-core').PgTable} schema
 * @param {BaseModelOptions} options
 * @return {Model}
 */
export const baseModel = (schema, methods = {}) => {
  if (Object.keys(methods).length === 0) {
    return createModel(schema, {
      create,
      deleteById,
      getAll,
      getById,
      update
    })
  }

  return createModel(schema, methods)

  // const baseModel = (schema, { extendedMethods = {}, excludedFields = [], excludeMethods = [] }) => {
  // return {
  //   /**
  //    *
  //    * @param {Record<string, unknown>} payload
  //    * @returns {SingleResponse}
  //    */
  //   async create (payload) {
  //     return schema.insert(schema).values(payload).returning(generateReturning(excludedFields))
  //   },

  //   /**
  //    *
  //    * @param {import('../../utils/query/requestParser.js').RequestData} requestData
  //    * @returns {SingleResponse}
  //    */
  //   deleteById (requestData) {
  //     return schema.delete(schema).where(eq(schema.id, requestData.identifier))
  //   },

  //   /**
  //    *
  //    * @param {import('../../utils/index.js').RequestData} requestData
  //    * @returns {Promise<import('../../data-source.js').FindAllResponse>}
  //    */
  //   getAll (requestData) {
  //     const query = queryBuilder(requestData)

  //     return db.query[getTableName(schema)].findMany(query).execute()
  //   },

  //   /**
  //    *
  //    * @param {import('../../utils/index.js').RequestData} requestData
  //    * @returns {Promise<Record<string, unknown>}
  //    */
  //   getById (requestData) {
  //     const query = queryBuilder(schema, requestData, excludedFields)

  //     return db.query[getTableName(schema)].findFirst(query)
  //   },

  //   /**
  //    *
  //    * @param {string} id
  //    * @param {Record<string, unknown>} payload
  //    * @returns {Promise<Record<string, unknown>}
  //    */
  //   update (id, payload) {
  //     payload.updated_at = sql`now()`

  //     return schema.update(schema)
  //       .set(payload)
  //       .where(eq(schema.id, id))
  //       .returning(generateReturning(excludedFields))
  //   },
  //   ...extendedMethods
  // }
}

// export default baseModel
