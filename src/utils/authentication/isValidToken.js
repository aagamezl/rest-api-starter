import { eq } from 'drizzle-orm'
import config from '../../../config/index.js'
import { db } from '../../data-source.js'
import { authToken } from '../../domains/schemas.js'
import verifyToken from './verifyToken.js'

/**
 *
 * @param {string} token
 * @returns {boolean}
 */
const isValidToken = async (token) => {
  // Check if the token exists in the active token list
  const record = await db.query.authToken.findFirst({
    where: eq(authToken.token, token)
  })

  if (!record) {
    throw new Error('The authentication token doesn\'t exist')
  }

  // Check if the token has not expired
  return verifyToken(record.token, config.authentication.secret)
}

export default isValidToken
