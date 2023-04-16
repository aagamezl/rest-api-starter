import { dataSource } from '../../data-source.js'
import { queryBuilder } from '../query/queryBuilder.js'

/**
 * Base Model
 *
 * @typedef Model
 * @type {object}
 *
 * @property {(payload: Object.<string, unknown>) => Promise.<Object.<string, unknown>>} create
 * @property {(id: string) => Promise.<Object.<string, unknown>>} deleteById
 * @property {(requestData: import('../query/requestParser.js').RequestData) => Promise.<GetAllResponse>} getAll
 * @property {(id: string, requestData: import('../query/requestParser.js').RequestData) => Promise.<Object.<string, unknown>>} getById
 * @property {(id: string, payload: UpdatePayload.<TEntity>) => Promise.<Object.<string, unknown>>} update
 */

/**
 *
 * @param {string} modelName
 * @param {Object.<string, Function>} methods
 * @return {Model}
 */
export const baseModel = (modelName, methods = {}) => {
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
     * @param {string} id
     * @returns {Promise<Object.<string, unknown>>}
     */
    delete (query) {
      return dataSource.manager(modelName).delete(query)
    },

    /**
     *
     * @param {import('../../utils/index.js').RequestData} requestData
     * @returns {Promise<import('../../data-source.js').FindAllResponse>}
     */
    getAll (requestData) {
      const query = queryBuilder(requestData)

      return dataSource.manager(modelName).findAndCountAll(query)
    },

    /**
     *
     * @param {import('../../utils/index.js').RequestData} requestData
     * @returns {Promise.<Object.<string, unknown>}
     */
    getById (requestData) {
      const query = queryBuilder(requestData)

      return dataSource.manager(modelName).findUnique(query)
    },

    /**
     *
     * @param {string} id
     * @param {Object.<string, unknown>} payload
     * @returns {Promise.<Object.<string, unknown>}
     */
    update (id, payload) {
      return dataSource.manager(modelName).update(id, payload)
    },
    ...methods
  }
}
