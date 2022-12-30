import { Sequelize } from 'sequelize'

import { config } from '../config/index.js'

let sequelize

/**
 *
 * @returns {Sequelize}
 */
const getInstance = () => {
  if (sequelize === undefined) {
    sequelize = new Sequelize(
      config[config.server.environment].name,
      config[config.server.environment].username,
      config[config.server.environment].password,
      {
        host: config[config.server.environment].host,
        dialect: config[config.server.environment].dialect
      }
    )
  }

  return sequelize
}

export const dataSource = {
  getInstance
}
