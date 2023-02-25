import { AppDataSource } from '../../data-source.js'
import { AuthToken } from '../../domains/auth-token/auth-token.entity.js'
import { config } from '../../../config/index.js'
import { verifyToken } from './verifyToken.js'

export const isValidToken = async (token) => {
  // Check if the token exists in the active token list
  const authToken = await AppDataSource.manager.findOneByOrFail(AuthToken, {
    token
  })

  // Check if the token has not expired
  const verifiedToken = await verifyToken(authToken.token, config.authentication.secret)

  return verifiedToken
}
