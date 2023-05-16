import { config } from '../../../config/index.js'
import { dataSource } from '../../data-source.js'
import { createHashValue, generateToken, getToken } from '../../utils/authentication/index.js'

import { baseModel } from '../../utils/domains/base.model.js'
import { queryBuilder } from '../../utils/index.js'

/**
 * UserData
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
const create = async (payload) => {
  const password = createHashValue(payload.password)

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
 * @returns {Promise<import('../../data-source.js').FindAndCountAll>}
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
 * @returns {Promise.<UserData>}
 */
const login = async ({ email, password }) => {
  const user = await dataSource.manager('user').findOne({
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

  const userData = {
    token,
    username: `${user.firstname} ${user.lastname}`,
    email: user.email
  }

  // Save token in list of valid tokens
  await dataSource.manager('authToken').create({ token })

  return userData
}

const logout = async (authorization) => {
  const token = getToken(authorization)

  return await dataSource.manager('authToken').delete({ token })
}

/**
 *
 * @param {string} id
 * @param {Object.<string, unknown>} payload
 * @returns {Promise.<Object.<string, unknown>>}
 */
const update = async (id, payload) => {
  if (payload.password) {
    payload.password = createHashValue(payload.password)
  }

  const user = await dataSource.manager('user').update(id, payload)

  // The password is not meant to be returned
  delete user.password

  return user
}

export const model = baseModel('user', { create, getAll, getById, login, logout, update })
