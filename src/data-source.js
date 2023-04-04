import { PrismaClient } from '@prisma/client'

/**
 * Represent the Request Data for an JSON API URL
 *
 * @typedef FindAllResponse
 * @type {object}
 * @property {number} count                   - Indicates the total amount of record for the resource.
 * @property {Object.<string, unknown>} items - Indicates items returned according the the request data.
 */

const dbInstance = new PrismaClient()

/**
 *
 * @returns {PrismaClient}
 */
// const getInstance = () => {
//   // return new PrismaClient()
//   return dbInstance
// }

// const dbInstance = getInstance()

/**
 *
 * @param {string} modelName
 * @returns
 */
// export const dataSource = {
//   create: (modelName, payload) => {
//     // const dbInstance = getInstance()

//     return dataSource.getInstance().user.create({
//       data: {
//         ...payload
//       }
//     })
//   },

//   /**
//    *
//    * @returns {PrismaClient}
//    */
//   getInstance: () => {
//     // return new PrismaClient()
//     return dbInstance
//   }
// }

export const dataSource = {
  /**
   *
   * @param {string} modelName
   * @param {Object.<string, unknown>} payload
   * @returns
   */
  create: (modelName, payload) => {
    return dataSource.getInstance()[modelName].create({
      data: {
        ...payload
      }
    })
  },

  /**
   *
   * @param {string} modelName
   * @param {string} id
   * @returns {Promise<Object.<string, unknown>>}
   */
  deleteById: (modelName, id) => {
    return dataSource.getInstance()[modelName].delete({
      where: {
        id
      }
    })
  },

  /**
   *
   * @param {string} modelName
   * @param {import('./utils/index.js').Query} query
   * @returns {Promise.<FindAllResponse>}
   */
  findAll: async (modelName, query) => {
    return dataSource.getInstance()[modelName].findMany(query)
  },

  /**
   *
   * @param {string} modelName
   * @param {import('./utils/index.js').Query} query
   * @returns {Promise.<Object.<string, unknown>}
   */
  findAndCountAll: async (modelName, query) => {
    const dbInstance = dataSource.getInstance()
    const entity = dbInstance[modelName]

    const [count, items] = await dbInstance.$transaction([
      entity.count(),
      entity.findMany(query)
    ])

    return { count, items }
  },

  /**
   *
   * @param {string} modelName
   * @param {import('./utils/index.js').Query} query
   * @returns {Promise.<Object.<string, unknown>}
   */
  findOne: (modelName, query) => {
    return dataSource.getInstance()[modelName].findFirst({
      where: {
        ...query
      }
    })
  },

  /**
   *
   * @param {string} modelName
   * @param {import('./utils/index.js').Query} query
   * @returns {Promise.<Object.<string, unknown>}
   */
  findUnique: (modelName, query) => {
    return dataSource.getInstance()[modelName].findUnique(query)
  },

  findOrCreate: () => {
  },

  /**
   *
   * @returns {PrismaClient}
   */
  getInstance: () => {
    return dbInstance
  },

  /**
   *
   * @param {string} modelName
   * @param {string} id
   * @param {Object.<string, unknown>} payload
   * @returns
   */
  update: (modelName, id, payload) => {
    return dataSource.getInstance()[modelName].update({
      where: {
        id
      },
      data: {
        ...payload
      }
    })
  }
}

// export const dataSource = {
//   manager,
//   getInstance
// }
