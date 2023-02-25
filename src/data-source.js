import { PrismaClient } from '@prisma/client'

let dbInstance

/**
 *
 * @returns {Sequelize}
 */
const getInstance = () => {
  if (dbInstance === undefined) {
    dbInstance = new PrismaClient()
  }

  return dbInstance
}

const manager = (Model) => {
  return {
    findAll: () => {
      return Model.findAll()
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
