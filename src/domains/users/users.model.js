import { config } from '../../../config/index.js'
import { dataSource } from '../../data-source.js'
import { createHashValue, generateToken } from '../../utils/authentication/index.js'

import { baseModel } from '../../utils/domains/base.model.js'

// const { user: entity } = dataSource.getInstance()

/**
 *
 * @param {Object.<string, unknown>} payload
 * @returns {Promise<object>}
 */
export const create = async (payload) => {
  const password = createHashValue(payload.password)

  const user = await dataSource.manager('user').create({
    ...payload,
    password
  })

  // The password is not meant to be returned
  delete user.password

  return await user
}

// /**
//  *
//  * @param {string} id
//  * @returns {Promise<Object.<string, unknown>>}
//  */
// export const deleteById = (id) => {
//   return dataSource.manager('user').deleteById(id)
// }

// /**
//  *
//  * @param {import('../../utils/index.js').RequestData} requestData
//  * @returns {Promise<import('../../data-source.js').FindAllResponse>}
//  */
// export const getAll = (requestData) => {
//   return dataSource.manager('user').findAndCountAll(requestData, ['password'])
// }

// /**
//  *
//  * @param {import('../../utils/index.js').RequestData} requestData
//  * @returns {Promise.<Object.<string, unknown>}
//  */
// export const getById = (requestData) => {
//   return dataSource.manager('user').findByPk(requestData, ['password'])
// }

/**
 *
 * @param {Object.<string, string>} payload
 * @returns
 */
export const login = async ({ email, password }) => {
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

  if (!token) {
    throw new Error('Error signing JWT token.')
  }

  const userData = {
    token: token,
    username: `${user.firstname} ${user.lastname}`,
    email: user.email
  }

  // Save token in list of valid tokens
  await await dataSource.manager('authToken').create({ token })

  return userData
}

/**
 *
 * @param {string} id
 * @param {Object.<string, unknown>} payload
 * @returns {Promise.<Object.<string, unknown>}
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

export const model = baseModel('user', { create, login, update })
