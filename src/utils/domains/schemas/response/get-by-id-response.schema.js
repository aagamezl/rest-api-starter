import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { createSchema, ErrorByIdResponseSchema } from '../index.js'

/**
 *
 * @param {import('@sinclair/typebox').TObject} schema
 * @returns
 */
export const getByIdResponseSchema = (schema) => {
  return {
    [StatusCodes.OK]: createSchema(schema, ReasonPhrases.OK),
    ...ErrorByIdResponseSchema
  }
}
