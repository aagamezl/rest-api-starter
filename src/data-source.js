import { PrismaClient } from '@prisma/client'

// let dbInstance

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
  return {
    findAll: () => {
      return getInstance()[modelName].findMany()
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
