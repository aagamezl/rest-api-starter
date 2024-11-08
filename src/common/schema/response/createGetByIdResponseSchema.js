import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { createProblemSchema, createSchema } from '../index.js'

/**
 *
 * @param {object} schema // TODO: create correct type
 * @returns {object} // TODO: create correct type
 */
export const createGetByIdResponseSchema = (schema) => {
  return {
    [StatusCodes.OK]: createSchema(schema, ReasonPhrases.OK),
    [StatusCodes.NOT_FOUND]: createProblemSchema(ReasonPhrases.NOT_FOUND),
    [StatusCodes.BAD_REQUEST]: createProblemSchema(ReasonPhrases.BAD_REQUEST),
    [StatusCodes.INTERNAL_SERVER_ERROR]: createProblemSchema(
      ReasonPhrases.INTERNAL_SERVER_ERROR
    )
  }
}
