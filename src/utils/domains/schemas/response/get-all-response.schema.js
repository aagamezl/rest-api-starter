import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { Type } from '@sinclair/typebox'

import { createSchema, ErrorResponseSchema } from '../index.js'

/**
 *
 * @param {import('@sinclair/typebox').TObject} schema
 * @returns
 */
export const getAllResponseSchema = (schema) => {
  return {
    [StatusCodes.OK]: createSchema(
      Type.Object({
        data: Type.Array(schema)
      }),
      ReasonPhrases.OK
    ),
    ...ErrorResponseSchema
  }
}
