import { StatusCodes } from 'http-status-codes'

import { getToken, isValidToken } from '../authentication/index.js'

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
export const authenticate = async (req, res, next) => {
  try {
    const authToken = getToken(req.headers.authorization)

    if (!authToken) {
      return res.status(StatusCodes.FORBIDDEN).json({
        type: 'about:blank',
        status: StatusCodes.FORBIDDEN,
        title: 'AuthenticationTokenInvalid',
        details: 'The authentication token is invalid or has expired'
      })
    }

    // Verificar si el token es válido y no ha expirado
    // await verifyToken(authToken, config.authentication.secret as string);
    const isValid = await isValidToken(authToken)

    // si no se ha invalidado ese token con el endpoint logout
    if (!isValid) {
      return res.status(StatusCodes.FORBIDDEN).json({
        type: 'about:blank',
        status: StatusCodes.FORBIDDEN,
        title: 'AuthenticationTokenInvalid',
        details: 'The authentication token is invalid or has expired'
      })
    }

    next()
  } catch (error) {
    return res.status(StatusCodes.FORBIDDEN).json({
      type: 'about:blank',
      status: StatusCodes.FORBIDDEN,
      title: 'AuthenticationTokenNotFound',
      details: 'The authentication token doesn\'t exist'
    })
  }
}
