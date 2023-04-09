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
  /**
   *
   * @param {Object.<string, unknown>} payload
   * @returns {Promise.<Object.<string, unknown>>}
   */
  const create = async (payload) => {
    const user = await dataSource.manager(modelName).create(payload)

    // The password is not meant to be returned
    delete user.password

    return await user
  }

  /**
   *
   * @param {string} id
   * @returns {Promise<Object.<string, unknown>>}
   */
  const deleteById = (id) => {
    return dataSource.manager(modelName).deleteById(id)
  }

  /**
   *
   * @param {import('../../utils/index.js').RequestData} requestData
   * @returns {Promise<import('../../data-source.js').FindAllResponse>}
   */
  const getAll = (requestData) => {
    const query = queryBuilder(requestData)

    return dataSource.manager(modelName).findAndCountAll(query)
  }

  /**
   *
   * @param {import('../../utils/index.js').RequestData} requestData
   * @returns {Promise.<Object.<string, unknown>}
   */
  const getById = (requestData) => {
    const query = queryBuilder(requestData)

    return dataSource.manager(modelName).findUnique(query)
  }

  /**
   *
   * @param {string} id
   * @param {Object.<string, unknown>} payload
   * @returns {Promise.<Object.<string, unknown>}
   */
  const update = async (id, payload) => {
    return dataSource.manager(modelName).update(id, payload)
  }

  return {
    create,
    deleteById,
    getAll,
    getById,
    update,
    ...methods
  }
}
