import { DataTypes } from 'sequelize'

import { dataSource } from '../../data-source'

const sequelize = dataSource.getInstance()

export const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
})
