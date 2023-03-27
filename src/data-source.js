import { Prisma, PrismaClient } from '@prisma/client'

import {
  createQueryCondition,
  excludeFields,
  getPagination,
  scalarEnumToFields
} from './utils/index.js'

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
const getInstance = () => {
  return new PrismaClient()
}

/**
 *
 * @param {string} modelName
 * @returns
 */
const manager = (modelName) => {
  const entity = dbInstance[modelName]

  return {
    /**
     *
     * @param {Object.<string, unknown>} payload
     * @returns
     */
    create: (payload) => {
      return entity.create({
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
    deleteById: (id) => {
      return entity.delete({
        where: {
          id
        }
      })
    },

    /**
     *
     * @param {import('./utils/index.js').RequestData} requestData
     * @param {string[]} excludedFields
     * @returns {Promise.<FindAllResponse>}
     */
    findAll: async (requestData, excludedFields) => {
      const query = createQueryCondition(modelName, requestData)
      const { number, size } = getPagination(requestData.queryData.page)

      query.skip = number
      query.take = size
      query.select = excludeFields(
        query.select ?? scalarEnumToFields(Prisma[`${entity.name}ScalarFieldEnum`]),
        excludedFields
      )

      return entity.findMany(query)
    },

    /**
     *
     * @param {import('./utils/index.js').RequestData} requestData
     * @param {string[]} excludedFields
     * @returns {Promise.<Object.<string, unknown>}
     */
    findByPk: (requestData, excludedFields = []) => {
      const query = createQueryCondition(modelName, requestData)

      query.select = excludeFields(
        query.select ?? scalarEnumToFields(Prisma[`${entity.name}ScalarFieldEnum`]),
        excludedFields
      )

      query.where = {
        id: requestData.identifier
      }

      return entity.findUnique(query)
    },

    findOne: (query) => {
      return entity.findFirstOrThrow({
        where: {
          ...query
        }
      })
    },

    findOrCreate: () => {
    },

    findAndCountAll: async (requestData, excludedFields) => {
      const query = createQueryCondition(modelName, requestData)
      const { number, size } = getPagination(requestData.queryData.page)

      query.skip = number
      query.take = size
      query.select = excludeFields(
        query.select ?? scalarEnumToFields(Prisma[`${entity.name}ScalarFieldEnum`]),
        excludedFields
      )

      const [count, items] = await dbInstance.$transaction([
        entity.count(),
        entity.findMany(query)
      ])

      return { count, items }
    },

    update: (id, payload) => {
      return entity.update({
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

export const dataSource = {
  manager,
  getInstance
}
