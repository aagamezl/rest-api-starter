import { eq } from 'drizzle-orm'

import BaseModel from '../../utils/domains/BaseModel.js'
import { connection, db } from '../../data-source.js'
import { createHashValue, generateToken, getToken } from '../../utils/authentication/index.js'
import { authToken } from '../schemas.js'
import config from '../../../config/index.js'

export default class UserModel extends BaseModel {
  constructor (model, options = {}) {
    super(model, { ...options, ...{ excludedFields: ['password'] } })
  }

  async login ({ email, password }) {
    const user = await db.query[this.tableName].findFirst({
      email,
      password: createHashValue(password)
    }).finally(() => { connection.close() })

    const token = await generateToken(
      user.email,
      config.authentication.secret,
      config.authentication.expiresIn
    )

    const userData = {
      token,
      username: `${user.firstname} ${user.lastname}`,
      email: user.email
    }

    // Save token in list of valid tokens
    await db.insert(authToken).values({ token }).returning()

    return userData
  }

  /**
   *
   * @param {string} authorization
   * @returns {Promise.<authToken[] | undefined>}
   */
  async logout (authorization) {
    const token = getToken(authorization)

    return db.delete(authToken).where(eq(authToken.token, token)).returning()
  }
}
