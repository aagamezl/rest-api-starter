import { dataSource } from '../../data-source.js'
import { queryBuilder } from '../query/queryBuilder.js'

/**
 * Base Model
 *
 * @typedef Model
 * @type {object}
 *
 * @property {(payload: Object.<string, unknown>) => Promise.<AbstractBaseEntity>} create
 * @property {(id: string) => Promise.<Object.<string, unknown>>} deleteById
 * @property {(requestData: import('../query/requestParser.js').RequestData) => Promise.<GetAllResponse>} getAll
 * @property {(id: string, requestData: import('../query/requestParser.js').RequestData) => Promise.<AbstractBaseEntity>} getById
 * @property {(id: string, payload: UpdatePayload.<TEntity>) => Promise.<AbstractBaseEntity>} update
 */

/**
 *
 * @param {string} modelName
 * @param {Object.<string, Function>} methods
 * @return {Model}
 */
export const baseModel = (modelName, methods) => {
  /**
   *
   * @param {Object.<string, unknown>} payload
   * @returns {Promise<object>}
   */
  const create = async (payload) => {
    const user = await dataSource.create(modelName, payload)

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
    return dataSource.deleteById(modelName, id)
  }

  /**
   *
   * @param {import('../../utils/index.js').RequestData} requestData
   * @returns {Promise<import('../../data-source.js').FindAllResponse>}
   */
  const getAll = (requestData) => {
    const query = queryBuilder(requestData)

    return dataSource.findAndCountAll(modelName, query)
  }

  /**
   *
   * @param {import('../../utils/index.js').RequestData} requestData
   * @returns {Promise.<Object.<string, unknown>}
   */
  const getById = (requestData) => {
    const query = queryBuilder(requestData, ['password'])

    return dataSource.findUnique(modelName, query)
  }

  /**
   *
   * @param {string} id
   * @param {Object.<string, unknown>} payload
   * @returns {Promise.<Object.<string, unknown>}
   */
  const update = async (id, payload) => {
    return dataSource.manager('user').update(id, payload)
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
