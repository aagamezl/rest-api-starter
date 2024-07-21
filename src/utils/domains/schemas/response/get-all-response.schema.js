import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { Type } from '@sinclair/typebox'

import createResponseSchema from '../create-schema.js'
import ErrorResponseSchema from './schemas/error-response.schema.js'

/**
 *
 * @param {import('@sinclair/typebox').TObject} schema
 * @returns
 */
const getAllResponseSchema = (schema) => {
  return {
    [StatusCodes.OK]: createResponseSchema(
      Type.Object({
        data: Type.Array(schema)
      }),
      ReasonPhrases.OK
    ),
    ...ErrorResponseSchema
  }
}

export default getAllResponseSchema
