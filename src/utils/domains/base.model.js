import { dataSource } from '../../data-source.js'
import { queryBuilder } from '../query/queryBuilder.js'

/**
 * Base Model
 *
 * @template T
 * @typedef {T & {
 * create: (payload: Object.<string, unknown>) => Promise.<Object.<string, unknown>>
 * delete: (query: import('../../data-source.js').Query) => Promise.<Object.<string, unknown>>
 * getAll: (requestData: import('../query/requestParser.js').RequestData) => Promise.<Object.<string, unknown>>
 * getById: (requestData: import('../query/requestParser.js').RequestData) => Promise.<Object.<string, unknown>>
 * update: (id: string, payload: Object.<string, unknown>) => Promise.<Object.<string, unknown>>
 * }} Model<T>
 */

/**
 * @template T
 * @param {string} modelName
 * @param {T} [methods]
 * @returns {Model<T>}
 */
export const baseModel = (modelName, methods) => {
  return {
    /**
     *
     * @param {Object.<string, unknown>} payload
     * @returns {Promise.<Object.<string, unknown>>}
     */
    async create (payload) {
      return dataSource.manager(modelName).create(payload)
    },

    /**
     *
     * @param {import('../../data-source.js').Query} query
     * @returns {Promise<Object.<string, unknown>>}
     */
    delete (query) {
      return dataSource.manager(modelName).delete(query)
    },

    /**
     *
     * @param {import('../../utils/index.js').RequestData} requestData
     * @returns {Promise<import('../../data-source.js').FindAndCountAll>}
     */
    getAll (requestData) {
      const query = queryBuilder(requestData)

      return dataSource.manager(modelName).findAndCountAll(query)
    },

    /**
     *
     * @param {import('../../utils/index.js').RequestData} requestData
     * @returns {Promise.<Object.<string, unknown>>}
     */
    getById (requestData) {
      const query = queryBuilder(requestData)

      return dataSource.manager(modelName).findUnique(query)
    },

    /**
     *
     * @param {string} id
     * @param {Object.<string, unknown>} payload
     * @returns {Promise.<Object.<string, unknown>>}
     */
    update (id, payload) {
      return dataSource.manager(modelName).update(id, payload)
    },
    ...methods
  }
}
