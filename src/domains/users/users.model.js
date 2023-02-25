import { dataSource } from '../../data-source.js'
// import { user as User } from './users.entity.js'

/**
 *
 * @param {object} payload
 * @returns {Promise<object>}
 */
export const create = async (payload) => {
}

/**
 *
 * @param {string} id
 * @returns {Promise<object>}
 */
export const deleteById = async (id) => {
}

/**
 *
 * @param {RequestData} requestData
 * @returns {Promise<>}
 */
export const getAll = async (requestData) => {
  // return dataSource.manager(User).findAll()
  return dataSource.manager({}).findAll()
}

/**
 *
 * @param {string} id
 * @param {RequestData} requestData
 * @returns
 */
export const getById = async (id, requestData) => {
}

export const login = async (requestData) => {
  console.log(requestData)

  return {
    ok: true
  }
}

/**
 *
 * @param {string} id
 * @param {Promise<UpdatePayload<Grocery>>} payload
 * @returns
 */
export const update = async (id, payload) => {
}
