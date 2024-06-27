import { StatusCodes } from 'http-status-codes'

import { loggerHandler } from '../index.js'
import { requestParser } from '../query/index.js'
import getError from './getError.js'

export const CONTENT_TYPE = 'application/vnd.api+json; charset=utf-8'

/** @typedef {(req: Request, res: Response) => void} Handler */

/**
 * BaseController
 *
 * @typedef BaseController
 * @type {object}
 * @property {Handler} create
 * @property {Handler} deleteById
 * @property {Handler} getAll
 * @property {Handler} getById
 * @property {Handler} update
 */

/**
 * @param {import('./base.model.js').Model} model
 * @param {Record<string, Function>} methods
 * @returns {BaseController}
 */
const baseController = (model, methods = {}) => {
  /**
   *
   * @param {import('fastify').FastifyRequest} request
   * @param {import('fastify').FastifyReply} reply
   */
  const create = async (request, reply) => {
    try {
      const [record] = await model.create(request.body)

      return reply.header('Content-Type', CONTENT_TYPE).status(StatusCodes.CREATED).send(record)
    } catch (error) {
      loggerHandler.error(error)

      const returnError = getError(error)

      return reply.header('Content-Type', CONTENT_TYPE).status(returnError.status).send(returnError)
    }
  }

  /**
   *
   * @param {import('fastify').FastifyRequest} request
   * @param {import('fastify').FastifyReply} reply
   */
  const deleteById = async (request, reply) => {
    try {
      await model.delete({ identifier: request.params.id })

      return reply.status(StatusCodes.NO_CONTENT).send()
    } catch (error) {
      loggerHandler.error(error)

      const returnError = getError(error)

      return reply.header('Content-Type', CONTENT_TYPE).status(returnError.status).send(returnError)
    }
  }

  /**
   *
   * @param {import('fastify').FastifyRequest} request
   * @param {import('fastify').FastifyReply} reply
   */
  const getAll = async (request, reply) => {
    try {
      const requestData = requestParser(request.url)

      const records = await model.getAll(requestData)

      return reply.header('Content-Type', CONTENT_TYPE).send(records)
    } catch (error) {
      loggerHandler.error(error)

      const returnError = getError(error)

      return reply.header('Content-Type', CONTENT_TYPE).status(returnError.status).send(returnError)
    }
  }

  /**
   *
   * @param {import('fastify').FastifyRequest} request
   * @param {import('fastify').FastifyReply} reply
   */
  const getById = async (request, reply) => {
    try {
      const requestData = requestParser(request.url)
      const record = await model.getById(requestData)

      if (!record) {
        return reply.header('Content-Type', CONTENT_TYPE).status(StatusCodes.NOT_FOUND).send()
      }

      return reply.header('Content-Type', CONTENT_TYPE).send(record)
    } catch (error) {
      loggerHandler.error(error)

      const returnError = getError(error)

      return reply.header('Content-Type', CONTENT_TYPE).status(returnError.status).send(returnError)
    }
  }

  /**
   *
   * @param {import('fastify').FastifyRequest} request
   * @param {import('fastify').FastifyReply} reply
   */
  const update = async (request, reply) => {
    try {
      const [record] = await model.update(request.params.id, request.body)

      return reply.header('Content-Type', CONTENT_TYPE).send(record)
    } catch (error) {
      loggerHandler.error(error)

      const returnError = getError(error)

      return reply.header('Content-Type', CONTENT_TYPE).status(returnError.status).send(returnError)
    }
  }

  return {
    create,
    deleteById,
    getAll,
    getById,
    update,
    ...methods
  }
}

export default baseController
