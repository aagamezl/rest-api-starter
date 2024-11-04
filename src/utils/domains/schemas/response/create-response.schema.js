import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { createSchema } from '../../index.js'
import { ErrorResponseSchema } from './schemas/error-response.schema.js'

/**
 *
 * @param {import('@sinclair/typebox').TObject} schema
 * @returns
 */
export const createResponseSchema = (schema) => {
  return {
    [StatusCodes.CREATED]: createSchema(schema, ReasonPhrases.CREATED),
    ...ErrorResponseSchema
  }
}
