import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { createProblemSchema } from './createProblemResponseSchema.js'
import { createNoContentSchema } from './createNoContentSchema.js'

/**
 *
 * @param {object} schema // TODO: create correct type
 * @returns {object} // TODO: create correct type
 */
export const createDeleteByIdResponseSchema = () => {
  return {
    [StatusCodes.NO_CONTENT]: createNoContentSchema(),
    [StatusCodes.NOT_FOUND]: createProblemSchema(ReasonPhrases.NOT_FOUND),
    [StatusCodes.BAD_REQUEST]: createProblemSchema(ReasonPhrases.BAD_REQUEST),
    [StatusCodes.INTERNAL_SERVER_ERROR]: createProblemSchema(
      ReasonPhrases.INTERNAL_SERVER_ERROR
    )
  }
}
