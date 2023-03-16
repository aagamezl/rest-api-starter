// import { AppDataSource } from '../../data-source.js'
// import { AuthToken } from '../../domains/auth-token/auth-token.entity.js'
// import { config } from '../../../config/index.js'
// import { dataSource } from '../../data-source.js'
// import { verifyToken } from './verifyToken.js'

export const isValidToken = async (token) => {
  // Check if the token exists in the active token list
  // const authToken = await dataSource.getInstance().findOneByOrFail(AuthToken, {
  //   token
  // })

  // Check if the token has not expired
  // const verifiedToken = await verifyToken(authToken.token, config.authentication.secret)

  // return verifiedToken
}
