import { dataSource } from '../../data-source.js'
// import { user as User } from './users.entity.js'
import { createHashValue } from '../../utils/authentication/index.js'
// import { getPagination, scalarEnumToFields } from '../../utils/index.js'
// import { createQueryCondition } from '../../utils/query/createQueryCondition.js'
// import { findAndCountAll } from '../../utils/query/findAndCountAll.js'

const { user: entity } = dataSource.getInstance()

/**
 *
 * @param {object} payload
 * @returns {Promise<object>}
 */
export const create = async (payload) => {
  const password = createHashValue(payload.password)

  const user = await entity.create({
    data: {
      ...payload,
      password
    }
  })

  // The password is not meant to be returned
  delete user.password

  return await user
}

/**
 *
 * @param {string} id
 * @returns {Promise<object>}
 */
export const deleteById = async (id) => {
  return await entity.delete({
    where: {
      id
    }
  })
}

/**
 *
 * @param {RequestData} requestData
 * @returns {Promise<>}
 */
export const getAll = async (requestData) => {
  const users = await dataSource.manager('user').findAll(requestData, ['password'])
  // return dataSource.manager(dataSource.getInstance().user).findAll()
  // return dataSource.manager('user').findAll()
  // const query = createQueryCondition('user', requestData)

  // query.select = excludeFields(
  //   query.select ?? scalarEnumToFields(UserScalarFieldEnum),
  //   ['password']
  // )

  // return await findAndCountAll(entity, query)

  return users
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
