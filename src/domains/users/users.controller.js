// import { StatusCodes } from 'http-status-codes'

import { baseController } from '../../utils/index.js'
import * as model from './users.model.js'

export const controller = baseController(model)

// import { getError, loggerHandler, requestParser } from '../../utils/index.js'
// import model from './users.model.js'
// import { CONTENT_TYPE, PROBLEM_CONTENT_TYPE } from '../../utils/domains/constants.js'

// /**
//  *
//  * @param {import('fastify').FastifyRequest} request
//  * @param {import('fastify').FastifyReply} reply
//  */
// const create = async (request, reply) => {
//   try {
//     const record = await model.create(request.body, ['password'])

//     return reply.header('Content-Type', CONTENT_TYPE).status(StatusCodes.CREATED).send(record)
//   } catch (error) {
//     loggerHandler.error(error)

//     const returnError = getError(error)

//     return reply.header('Content-Type', PROBLEM_CONTENT_TYPE).status(returnError.status).send(returnError)
//   }
// }

// /**
//  *
//  * @param {import('fastify').FastifyRequest} request
//  * @param {import('fastify').FastifyReply} reply
//  */
// const deleteById = async (request, reply) => {
//   try {
//     await model.deleteById({ identifier: request.params.id })

//     return reply.status(StatusCodes.NO_CONTENT).send()
//   } catch (error) {
//     loggerHandler.error(error)

//     const returnError = getError(error)

//     return reply.header('Content-Type', CONTENT_TYPE).status(returnError.status).send(returnError)
//   }
// }

// /**
//  *
//  * @param {import('fastify').FastifyRequest} request
//  * @param {import('fastify').FastifyReply} reply
//  */
// const getAll = async (request, reply) => {
//   try {
//     const requestData = requestParser(request.url)

//     const records = await model.getAll(requestData)

//     return reply.header('Content-Type', CONTENT_TYPE).status(StatusCodes.OK).send(records)
//   } catch (error) {
//     console.log(error)

//     loggerHandler.error(error)

//     const returnError = getError(error)

//     console.log(returnError)

//     return reply.header('Content-Type', PROBLEM_CONTENT_TYPE).status(returnError.status).send(returnError)
//   }
// }

// /**
//  *
//  * @param {import('fastify').FastifyRequest} request
//  * @param {import('fastify').FastifyReply} reply
//  */
// const getById = async (request, reply) => {
//   try {
//     const requestData = requestParser(request.url)
//     const record = await model.getById(requestData)

//     if (!record) {
//       return reply.header('Content-Type', CONTENT_TYPE).status(StatusCodes.NOT_FOUND).send()
//     }

//     return reply.header('Content-Type', CONTENT_TYPE).send(record)
//   } catch (error) {
//     loggerHandler.error(error)

//     const returnError = getError(error)

//     return reply.header('Content-Type', CONTENT_TYPE).status(returnError.status).send(returnError)
//   }
// }

// /**
//  *
//  * @param {import('fastify').FastifyRequest} request
//  * @param {import('fastify').FastifyReply} reply
//  */
// const patch = async (request, reply) => {
//   try {
//     const [record] = await model.patch(request.params.id, request.body)

//     return reply.header('Content-Type', CONTENT_TYPE).send(record)
//   } catch (error) {
//     console.log(error)

//     loggerHandler.error(error)

//     const returnError = getError(error)

//     return reply.header('Content-Type', CONTENT_TYPE).status(returnError.status).send(returnError)
//   }
// }

// export default {
//   create,
//   deleteById,
//   getAll,
//   getById,
//   patch
// }
