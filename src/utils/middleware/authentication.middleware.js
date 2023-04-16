import { StatusCodes } from 'http-status-codes'

import { getToken, isValidToken } from '../authentication/index.js'
import { CONTENT_TYPE } from '../domains/base.controller.js'

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
      return res.set('Content-Type', CONTENT_TYPE).status(StatusCodes.FORBIDDEN).json({
        type: 'about:blank',
        status: StatusCodes.FORBIDDEN,
        title: 'AuthenticationTokenInvalid',
        details: 'The authentication token is invalid or has expired'
      })
    }

    // Verificar si el token es válido y no ha expirado
    const isValid = await isValidToken(authToken)

    // si no se ha invalidado ese token con el endpoint logout
    if (!isValid) {
      return res.set('Content-Type', CONTENT_TYPE).status(StatusCodes.FORBIDDEN).json({
        type: 'about:blank',
        status: StatusCodes.FORBIDDEN,
        title: 'AuthenticationTokenInvalid',
        details: 'The authentication token is invalid or has expired'
      })
    }

    next()
  } catch (error) {
    return res.set('Content-Type', CONTENT_TYPE).status(StatusCodes.FORBIDDEN).json({
      type: 'about:blank',
      status: StatusCodes.FORBIDDEN,
      title: 'AuthenticationTokenNotFound',
      details: error.message
    })
  }
}
