import { StatusCodes } from 'http-status-codes'

import { CONTENT_TYPE, PROBLEM_CONTENT_TYPE } from './constant.js'
import { createProblemResponse, loggerHandler, parseQueryParams } from '../index.js'

/**
 * @typedef {import('fastify').FastifyRequest} FastifyRequest
 */

/**
 * @typedef {import('fastify').FastifyReply} FastifyReply
 */

/**
 * @typedef {import('./base.model.js').BaseModel} BaseModel
 */

/**
 * @typedef {import('./base.model.js').Entity} Entity
 */

/**
 * @typedef {import('./base.model.js').GetAllResult>} GetAllResult
 */

/**
 * @typedef {import('./base.model.js').ExtraMethods} ExtraMethods
 */

/**
 * @typedef {Object} Controller
 * @property {(request: FastifyRequest, response: FastifyReply) => Promise<Entity>} create - Creates a new record.
 * @property {(request: FastifyRequest, response: FastifyReply) => Promise<void>} deleteById - Deletes a record by ID.
 * @property {(request: FastifyRequest, response: FastifyReply) => Promise<GetAllResult>} getAll - Retrieves all records.
 * @property {(request: FastifyRequest, response: FastifyReply) => Promise<Entity>} getById - Retrieves a record by ID.
 * @property {(request: FastifyRequest, response: FastifyReply) => Promise<Entity>} patch - Partially updates a record by ID.
 * @property {(request: FastifyRequest, response: FastifyReply) => Promise<Entity>} put - Partially updates a record by ID.
 * @property {ExtraMethods} extraMethods - Additional optional methods extending the controller.
 */

/**
 * Base controller function that provides basic CRUD operations.
 *
 * @param {BaseModel} model - The model object providing CRUD operations.
 * @param {Object.<string, function>} [extraMethods={}] - Optional additional methods to extend the base controller.
 * @returns {Controller & ExtraMethods} An object containing controller methods for the specified model.
 */
export const baseController = (model, extraMethods = {}) => {
  /**
   *
   * @param {FastifyRequest} request
   * @param {FastifyReply} reply
   * @returns {Promise<Entity>}
   */
  const create = async (request, reply) => {
    try {
      const record = await model.create(request.body, ['password'])

      return reply.header('Content-Type', CONTENT_TYPE).status(StatusCodes.CREATED).send(record[0])
    } catch (error) {
      loggerHandler.error(error)

      const returnError = createProblemResponse(error)

      return reply.header('Content-Type', PROBLEM_CONTENT_TYPE).status(returnError.status).send(returnError)
    }
  }

  /**
   *
   * @param {FastifyRequest} request
   * @param {FastifyReply} reply
   * @returns {Promise<void>}
   */
  const deleteById = async (request, reply) => {
    try {
      await model.deleteById({ identifier: request.params.id })

      return reply.status(StatusCodes.NO_CONTENT).send()
    } catch (error) {
      loggerHandler.error(error)

      const returnError = createProblemResponse(error)

      return reply.header('Content-Type', CONTENT_TYPE).status(returnError.status).send(returnError)
    }
  }

  /**
   *
   * @param {FastifyRequest} request
   * @param {FastifyReply} reply
   * @returns {GetAllResult>}
   */
  const getAll = async (request, reply) => {
    try {
      const requestData = parseQueryParams(request.url)

      const records = await model.getAll(requestData, ['password', 'deleted_at'])

      return reply.header('Content-Type', CONTENT_TYPE).status(StatusCodes.OK).send(records)
    } catch (error) {
      loggerHandler.error(error)

      const returnError = createProblemResponse(error)

      return reply.header('Content-Type', PROBLEM_CONTENT_TYPE).status(returnError.status).send(returnError)
    }
  }

  /**
   *
   * @param {FastifyRequest} request
   * @param {FastifyReply} reply
   * @returns {Promise<Entity>}
   */
  const getById = async (request, reply) => {
    try {
      // const record = await model.getById(requestData)
      const record = await model.getById(request.params.id)

      if (!record) {
        return reply.header('Content-Type', CONTENT_TYPE).status(StatusCodes.NOT_FOUND).send()
      }

      return reply.header('Content-Type', CONTENT_TYPE).send(record)
    } catch (error) {
      loggerHandler.error(error)

      const returnError = createProblemResponse(error)

      return reply.header('Content-Type', CONTENT_TYPE).status(returnError.status).send(returnError)
    }
  }

  /**
   *
   * @param {FastifyRequest} request
   * @param {FastifyReply} reply
   * @returns {Promise<Entity>}
   */
  const patch = async (request, reply) => {
    try {
      // const requestData = requestParser(request.url)

      const [record] = await model.patch(request.params.id, request.body)
      // const record = await model.patch(requestData, request.body)

      return reply.header('Content-Type', CONTENT_TYPE).send(record)
    } catch (error) {
      console.log(error)

      loggerHandler.error(error)

      const returnError = createProblemResponse(error)

      return reply.header('Content-Type', CONTENT_TYPE).status(returnError.status).send(returnError)
    }
  }

  /**
   *
   * @param {FastifyRequest} request
   * @param {FastifyReply} reply
   * @returns {Promise<Entity>}
   */
  const put = async (request, reply) => {
    try {
      const [record] = await model.put(request.params.id, request.body)

      return reply.header('Content-Type', CONTENT_TYPE).send(record)
    } catch (error) {
      console.log(error)

      loggerHandler.error(error)

      const returnError = createProblemResponse(error)

      return reply.header('Content-Type', CONTENT_TYPE).status(returnError.status).send(returnError)
    }
  }

  return {
    create,
    deleteById,
    getAll,
    getById,
    patch,
    put,
    ...extraMethods
  }
}
