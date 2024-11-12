import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { createProblemSchema, createSchema } from '../../index.js'

/**
 *
 * @param {object} schema // TODO: create correct type
 * @returns
 */
export const createResponseSchema = (schema) => {
  return {
    [StatusCodes.CREATED]: createSchema(schema, ReasonPhrases.CREATED), // TODO: improve description using the schema name
    [StatusCodes.BAD_REQUEST]: createProblemSchema(ReasonPhrases.BAD_REQUEST),
    [StatusCodes.INTERNAL_SERVER_ERROR]: createProblemSchema(
      ReasonPhrases.INTERNAL_SERVER_ERROR
    )
  }
}
