import { AppDataSource } from './../../data-source'
import { AuthToken } from './../../domains/auth-token/auth-token.entity'
import { config } from './../../config'
import { verifyToken } from './verifyToken'

export const isValidToken = async (token) => {
  // Check if the token exists in the active token list
  const authToken = await AppDataSource.manager.findOneByOrFail(AuthToken, {
    token
  })

  // Check if the token has not expired
  const verifiedToken = await verifyToken(authToken.token, config.authentication.secret)

  return verifiedToken
}
