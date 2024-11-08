import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { createProblemSchema, createSchema } from '../index.js'

/**
 *
 * @param {object} schema // TODO: create correct type
 * @returns {object} // TODO: create correct type
 */
export const createAllResponseSchema = (schema) => {
  return {
    [StatusCodes.OK]: createSchema(
      {
        title: 'Get Products Response',
        type: 'object',
        required: ['data', 'total'],
        properties: {
          data: {
            type: 'array',
            items: schema,
            description: 'Array of product objects'
          },
          total: {
            type: 'integer',
            minimum: 0,
            description: 'Total number of products available'
          }
        },
        additionalProperties: false
      },
      ReasonPhrases.OK
    ),
    [StatusCodes.BAD_REQUEST]: createProblemSchema(ReasonPhrases.BAD_REQUEST),
    [StatusCodes.INTERNAL_SERVER_ERROR]: createProblemSchema(
      ReasonPhrases.INTERNAL_SERVER_ERROR
    )
  }
}
