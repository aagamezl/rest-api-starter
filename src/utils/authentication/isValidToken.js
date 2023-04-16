import { config } from '../../../config/index.js'
import { dataSource } from '../../data-source.js'
import { verifyToken } from './verifyToken.js'

export const isValidToken = async (token) => {
  // Check if the token exists in the active token list
  const authToken = await dataSource.manager('authToken').findOne({
    token
  })

  if (!authToken) {
    throw new Error('The authentication token doesn\'t exist')
  }

  // Check if the token has not expired
  const verifiedToken = await verifyToken(authToken.token, config.authentication.secret)

  return verifiedToken
}
