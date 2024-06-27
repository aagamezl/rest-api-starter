import { StatusCodes } from 'http-status-codes'

import baseController, { CONTENT_TYPE } from '../../utils/domains/base.controller.js'
import { getError, loggerHandler } from '../../utils/index.js'
import model from './users.model.js'

/**
 *
 * @param {import('fastify').FastifyRequest} request
 * @param {import('fastify').FastifyReply} reply
 * @returns {import('fastify').FastifyReply}
 */
const login = async (request, reply) => {
  try {
    const user = await this.model.login(request.body)

    if (!user) {
      return reply.set('Content-Type', CONTENT_TYPE).status(StatusCodes.NOT_FOUND).send()
    }

    const { token, username, email } = user

    return reply.header('Content-Type', CONTENT_TYPE).send({ token, username, email })
  } catch (error) {
    loggerHandler.error(error)

    const returnError = getError(error)

    reply.header('Content-Type', CONTENT_TYPE).status(returnError.status).send(returnError)
  }
}

/**
 *
 * @param {import('fastify').FastifyRequest} request
 * @param {import('fastify').FastifyReply} reply
 * @returns {import('fastify').FastifyReply}
 */
const logout = async (request, reply) => {
  try {
    await this.model.logout(request.headers.authorization)

    return reply.status(StatusCodes.NO_CONTENT)
  } catch (error) {
    loggerHandler.error(error)

    const returnError = getError(error)

    reply.set('Content-Type', CONTENT_TYPE).status(returnError.status).send(returnError)
  }
}

const controller = baseController(model, {
  login,
  logout
})

export default controller
