import { StatusCodes } from 'http-status-codes'

import { BaseController, CONTENT_TYPE } from '../../utils/domains/BaseController.js'
import { errorHandler } from '../../utils/index.js'
import getError from '../../utils/domains/getError.js'

export default class UsersController extends BaseController {
  /**
   *
   * @param {import('fastify').FastifyRequest} request
   * @param {import('fastify').FastifyReply} reply
   * @returns {import('fastify').FastifyReply}
   */
  async login (request, reply) {
    try {
      const user = await this.model.login(request.body)

      if (!user) {
        return reply.set('Content-Type', CONTENT_TYPE).status(StatusCodes.NOT_FOUND).send()
      }

      const { token, username, email } = user

      return reply.header('Content-Type', CONTENT_TYPE).send({ token, username, email })
    } catch (error) {
      errorHandler.handle(error)

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
  async logout (request, reply) {
    try {
      await this.model.logout(request.headers.authorization)

      return reply.status(StatusCodes.NO_CONTENT)
    } catch (error) {
      errorHandler.handle(error)

      const returnError = getError(error)

      reply.set('Content-Type', CONTENT_TYPE).status(returnError.status).send(returnError)
    }
  }
}
