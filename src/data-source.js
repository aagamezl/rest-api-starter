import { PrismaClient } from '@prisma/client'

/**
 * Represent the Request Data for an JSON API URL
 *
 * @typedef FindAllResponse
 * @type {object}
 * @property {number} count                   - Indicates the total amount of record for the resource.
 * @property {Object.<string, unknown>[]} items - Indicates items returned according the the request data.
 */

/**
 * A set of methods for interacting with a database.
 *
 * @typedef {Object} DatabaseManager
 * @property {(payload: Object.<string, unknown>) => Promise.<Object.<string, unknown>>} create - Creates a new record in the database for the given model name and payload.
 * @property {(id: string) => Promise.<Object.<string, unknown>>} deleteById - Deletes a record from the database with the given id and model name.
 * @property {(query: import('./utils/index.js').Query) => Promise.<FindAllResponse>} findAll - Finds all records from the database for the given model name and query.
 * @property {(query: import('./utils/index.js').Query) => Promise.<Object.<string, unknown>>} findAndCountAll - Finds and counts all records from the database for the given model name and query.
 * @property {(query: import('./utils/index.js').Query) => Promise.<Object.<string, unknown>>} findOne - Finds a single record from the database for the given model name and query.
 * @property {(query: import('./utils/index.js').Query) => Promise.<Object.<string, unknown>>} findUnique - Finds a unique record from the database for the given model name and query.
 * @property {(id: string, payload: Object.<string, unknown>) => Promise.<Object.<string, unknown>>} update - Updates a record in the database with the given id and payload for the given model name.
 */

/**
 * Datasource abstraction to interact with the database using an ORM.
 *
 * @typedef {Object} DataSource
 * @property {() => PrismaClient} getInstance - Returns a new instance of Prisma Client
 * @property {DatabaseManager} manager - Returns a new database manager
 */

/**
 * @type {DataSource}
 */
export const dataSource = {
  /**
   *
   * @returns {PrismaClient}
   */
  getInstance: () => {
    return new PrismaClient()
  },

  /**
   *
   * @param {string} modelName
   * @returns {DatabaseManager}
   */
  manager: (modelName) => {
    const dbInstance = dataSource.getInstance()

    return {
      /**
       *
       * @param {Object.<string, unknown>} payload
       * @returns
       */
      create: (payload) => {
        return dbInstance[modelName].create({
          data: {
            ...payload
          }
        })
      },

      /**
       *
       * @param {string} id
       * @returns {Promise<Object.<string, unknown>>}
       */
      delete: (query) => {
        return dbInstance[modelName].delete({
          where: {
            ...query
          }
        })
      },

      /**
       *
       * @param {import('./utils/index.js').Query} query
       * @returns {Promise.<FindAllResponse>}
       */
      findAll: async (query) => {
        return dbInstance[modelName].findMany(query)
      },

      /**
       *
       * @param {import('./utils/index.js').Query} query
       * @returns {Promise.<Object.<string, unknown>}
       */
      findAndCountAll: async (query) => {
        const entity = dbInstance[modelName]

        const [count, items] = await dbInstance.$transaction([
          entity.count(),
          entity.findMany(query)
        ])

        return { count, items }
      },

      /**
       *
       * @param {import('./utils/index.js').Query} query
       * @returns {Promise.<Object.<string, unknown>}
       */
      findOne: (query) => {
        return dbInstance[modelName].findFirst({
          where: {
            ...query
          }
        })
      },

      /**
       *
       * @param {import('./utils/index.js').Query} query
       * @returns {Promise.<Object.<string, unknown>}
       */
      findUnique: (query) => {
        return dbInstance[modelName].findUnique(query)
      },

      /**
       *
       * @param {string} id
       * @param {Object.<string, unknown>} payload
       * @returns
       */
      update: (id, payload) => {
        return dbInstance[modelName].update({
          where: {
            id
          },
          data: {
            ...payload
          }
        })
      }
    }
  }
}
