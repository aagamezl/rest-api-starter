import { Prisma, PrismaClient } from '@prisma/client'

import {
  createQueryCondition,
  excludeFields,
  getPagination,
  scalarEnumToFields
} from './utils/index.js'

const dbInstance = new PrismaClient()

/**
 *
 * @returns {PrismaClient}
 */
const getInstance = () => {
  // if (dbInstance === undefined) {
  //   dbInstance = new PrismaClient()
  // }

  // return dbInstance
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
     * @param {RequestData} requestData
     * @param {Array<string>} excludedFields
     * @returns
     */
    findAll: (requestData, excludedFields) => {
      const query = createQueryCondition(modelName, requestData)
      const { offset, limit } = getPagination(requestData.queryData.page)

      query.skip = offset
      query.take = limit
      query.select = excludeFields(
        query.select ?? scalarEnumToFields(Prisma[`${entity.name}ScalarFieldEnum`]),
        excludedFields
      )

      return dbInstance.$transaction([
        entity.count(),
        entity.findMany(query)
      ])
    },
    findByPk: () => {

    },
    findOne: () => {

    },
    findOrCreate: () => {

    },
    findAndCountAll: () => {

    }
  }
}

export const dataSource = {
  manager,
  getInstance
}
