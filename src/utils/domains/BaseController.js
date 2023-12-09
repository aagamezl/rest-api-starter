import { StatusCodes } from 'http-status-codes'

import { errorHandler } from '../index.js'
import { requestParser } from '../query/index.js'
import getError from './getError.js'

export const CONTENT_TYPE = 'application/vnd.api+json; charset=utf-8'

/**
 * BaseController
 *
 * @typedef BaseController
 * @type {object}
 * @property {(req: Request, res: Response) => void} create
 * @property {(req: Request, res: Response) => void} deleteById
 * @property {(req: Request, res: Response) => void} getAll
 * @property {(req: Request, res: Response) => void} getById
 * @property {(req: Request, res: Response) => void} update
 */

export class BaseController {
  /**
   * @constructor
   * @param {import('./BaseModel.js').BaseModel} model
   */
  constructor (model) {
    this.model = model
  }

  /**
   *
   * @param {import('fastify').FastifyRequest} request
   * @param {import('fastify').FastifyReply} reply
   */
  async create (request, reply) {
    try {
      const [record] = await this.model.create(request.body)

      reply.header('Content-Type', CONTENT_TYPE).status(StatusCodes.CREATED).send(record)
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
   */
  async delete (request, reply) {
    try {
      // await this.model.delete({ id: request.params.id })
      await this.model.delete({ identifier: request.params.id })

      reply.status(StatusCodes.NO_CONTENT).send()
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
   */
  async getAll (request, reply) {
    try {
      const requestData = requestParser(request.url)

      // const requestDataExample = {
      //   resourceType: 'users',
      //   identifier: null,
      //   relationships: true,
      //   relationshipType: 'posts',
      //   queryData: {
      //     include: ['posts'],
      //     fields: { user: [Array], posts: [Array] },
      //     sort: [],
      //     page: { number: '2', size: 3 },
      //     filter: { like: {}, not: {}, lt: {}, lte: {}, gt: {}, gte: {} }
      //   }
      // }

      const records = await this.model.getAll(requestData)

      reply.header('Content-Type', CONTENT_TYPE).send(records)
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
   */
  async getById (request, reply) {
    try {
      const requestData = requestParser(request.url)
      const record = await this.model.getById(requestData)

      if (!record) {
        return reply.header('Content-Type', CONTENT_TYPE).status(StatusCodes.NOT_FOUND).end()
      }

      reply.header('Content-Type', CONTENT_TYPE).send(record)
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
   */
  async update (request, reply) {
    try {
      const [record] = await this.model.update(request.params.id, request.body)

      reply.header('Content-Type', CONTENT_TYPE).send(record)
    } catch (error) {
      errorHandler.handle(error)

      const returnError = getError(error)

      reply.header('Content-Type', CONTENT_TYPE).status(returnError.status).send(returnError)
    }
  }
}
