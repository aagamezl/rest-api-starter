// @ts-check

import { PrismaClient } from '@prisma/client'

/**
 * @typedef {import('./utils/index.js').Query} Query
 */

/**
 * @typedef {Object.<string, unknown>} Palyload
 */

/**
 * Represent the Request Data for an JSON API URL
 *
 * @typedef FindAndCountAll
 * @type {object}
 * @property {number} count - Indicates the total amount of record for the resource.
 * @property {Object.<string, unknown>[]} items - Indicates items returned according the the request data.
 */

/**
 * A set of methods for interacting with a database.
 *
 * @typedef {Object} DatabaseManager
 * @property {(payload: Palyload) => Promise.<Object.<string, unknown>>} create - Creates a new record in the database for the given model name and payload.
 * @property {(query: Query) => Promise.<Object.<string, unknown>>} delete - Deletes a record from the database with the given id and model name.
 * @property {(query: Query) => Promise.<Object.<string, unknown>[]>} findAll - Finds all records from the database for the given model name and query.
 * @property {(query: Query) => Promise.<FindAndCountAll>} findAndCountAll - Finds and counts all records from the database for the given model name and query.
 * @property {(query: Query) => Promise.<Object.<string, any>>} findOne - Finds a single record from the database for the given model name and query.
 * @property {(query: Query) => Promise.<Object.<string, unknown>>} findUnique - Finds a unique record from the database for the given model name and query.
 * @property {(id: string, payload: Palyload) => Promise.<Object.<string, unknown>>} update - Updates a record in the database with the given id and payload for the given model name.
 */

/**
 * Datasource abstraction to interact with the database using an ORM.
 *
 * @typedef {Object} DataSource
 * @property {() => PrismaClient} getInstance - Returns a new instance of Prisma Client
 * @property {(modelName: string) => DatabaseManager} manager - Returns a new database manager
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

    const manager = {
      /**
       *
       * @param {Palyload} payload
       * @returns {Promise.<Object.<string, unknown>>}
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
       * @param {Query} query
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
       * @param {Query} query
       * @returns {Promise.<Object.<string, unknown>[]>}
       */
      findAll: (query) => {
        return dbInstance[modelName].findMany(query)
      },

      /**
       *
       * @param {Query} query
       * @returns {Promise.<FindAndCountAll>}
       */
      findAndCountAll: async (query) => {
        const [count, items] = await dbInstance.$transaction([
          dbInstance[modelName].count(),
          manager.findAll(query)
        ])

        /** @type {FindAndCountAll} */
        return { count, items }
      },

      /**
       *
       * @param {Query} query
       * @returns {Promise.<Object.<string, unknown>>}
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
       * @param {Query} query
       * @returns {Promise.<Object.<string, unknown>>}
       */
      findUnique: (query) => {
        return dbInstance[modelName].findUnique(query)
      },

      /**
       *
       * @param {string} id
       * @param {Palyload} payload
       * @returns {Promise.<Object.<string, unknown>>}
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

    return manager
  }
}
