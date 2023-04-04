import { config } from '../../../config/index.js'
import { dataSource } from '../../data-source.js'
import { createHashValue, generateToken } from '../../utils/authentication/index.js'

import { baseModel } from '../../utils/domains/base.model.js'
import { queryBuilder } from '../../utils/index.js'

/**
 * User Data
 *
 * @typedef UserData
 * @type {object}
 *
 * @property {string} token
 * @property {string} username
 * @property {string} email
 */

/**
 *
 * @param {Object.<string, unknown>} payload
 * @returns {Promise<Object.<string, unknown>>}
 */
export const create = async (payload) => {
  const password = createHashValue(payload.password)

  const user = await dataSource.create('user', {
    ...payload,
    password
  })

  // The password is not meant to be returned
  delete user.password

  return await user
}

/**
 *
 * @param {import('../../utils/index.js').RequestData} requestData
 * @returns {Promise<import('../../data-source.js').FindAllResponse>}
 */
const getAll = (requestData) => {
  const query = queryBuilder(requestData, ['password'])

  return dataSource.findAndCountAll('user', query)
}

/**
 *
 * @param {Object.<string, string>} payload
 * @returns {Promise<UserData>}
 */
export const login = async ({ email, password }) => {
  const user = await dataSource.findOne('user', {
    email,
    password: createHashValue(password)
  })

  if (!user) {
    return
  }

  const token = await generateToken(
    user.email,
    config.authentication.secret,
    config.authentication.expiresIn
  )

  if (!token) {
    throw new Error('Error signing JWT token.')
  }

  const userData = {
    token,
    username: `${user.firstname} ${user.lastname}`,
    email: user.email
  }

  // Save token in list of valid tokens
  await dataSource.create('authToken', { token })

  return userData
}

/**
 *
 * @param {string} id
 * @param {Object.<string, unknown>} payload
 * @returns {Promise.<Object.<string, unknown>>}
 */
export const update = async (id, payload) => {
  if (payload.password) {
    payload.password = createHashValue(payload.password)
  }

  const user = await dataSource.update('user', id, payload)

  // The password is not meant to be returned
  delete user.password

  return user
}

export const model = baseModel('user', { create, getAll, login, update })
