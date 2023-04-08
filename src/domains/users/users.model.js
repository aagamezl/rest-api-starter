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

  // const user = await dataSource.create('user', {
  const user = await dataSource.manager('user').create({
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

  return dataSource.manager('user').findAndCountAll(query)
}

/**
 *
 * @param {import('../../utils/index.js').RequestData} requestData
 * @returns {Promise.<Object.<string, unknown>}
 */
const getById = (requestData) => {
  const query = queryBuilder(requestData, ['password'])

  return dataSource.manager('user').findUnique(query)
}

/**
 *
 * @param {Object.<string, string>} payload
 * @returns {Promise<UserData>}
 */
export const login = async ({ email, password }) => {
  const user = await dataSource.manager('user').findOne({
    email,
    password: createHashValue(password)
  })

  if (!user) {
    return
  }

  try {
    const token = await generateToken(
      user.email,
      config.authentication.secret,
      config.authentication.expiresIn
    )

    const userData = {
      token,
      username: `${user.firstname} ${user.lastname}`,
      email: user.email
    }

    // Save token in list of valid tokens
    await dataSource.manager('authToken').create({ token })

    return userData
  } catch (error) {
    throw new Error('Error signing JWT token.')
  }
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

  const user = await dataSource.manager('user').update(id, payload)

  // The password is not meant to be returned
  delete user.password

  return user
}

export const model = baseModel('user', { create, getAll, getById, login, update })
