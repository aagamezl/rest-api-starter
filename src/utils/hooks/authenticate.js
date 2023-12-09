import { StatusCodes } from 'http-status-codes'

import { getToken, isValidToken } from '../authentication/index.js'
import { CONTENT_TYPE } from '../domains/BaseController.js'

/**
 *
 * @param {import('fastify').FastifyRequest} request
 * @param {import('fastify').FastifyReply} reply
 * @param {import('fastify').RawRequestDefaultExpression} payload
 * @returns {import('fastify').RawRequestDefaultExpression}
 */
const authenticate = async (request, reply, payload) => {
  try {
    const token = getToken(request.headers.authorization)

    if (!token) {
      return reply.header('Content-Type', CONTENT_TYPE).status(StatusCodes.FORBIDDEN).send({
        type: 'about:blank',
        status: StatusCodes.FORBIDDEN,
        title: 'AuthenticationTokenInvalid',
        details: 'The authentication token is invalid or has expired'
      })
    }

    // Check if the token is valid and has not expired
    const isValid = await isValidToken(token)

    // If that token has not been invalidated with the endpoint logout
    if (!isValid) {
      return reply.header('Content-Type', CONTENT_TYPE).status(StatusCodes.FORBIDDEN).send({
        type: 'about:blank',
        status: StatusCodes.FORBIDDEN,
        title: 'AuthenticationTokenInvalid',
        details: 'The authentication token is invalid or has expired'
      })
    }

    return payload
  } catch (error) {
    return reply.header('Content-Type', CONTENT_TYPE).status(StatusCodes.FORBIDDEN).send({
      type: 'about:blank',
      status: StatusCodes.FORBIDDEN,
      title: 'AuthenticationTokenNotFound',
      details: error.message
    })
  }
}

export default authenticate
