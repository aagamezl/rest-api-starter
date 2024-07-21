import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { createSchema } from '../../index.js'
import ErrorByIdResponseSchema from './schemas/error-by-id-response.schema.js'

/**
 *
 * @param {import('@sinclair/typebox').TObject} schema
 * @returns
 */
const getByIdResponseSchema = (schema) => {
  return {
    [StatusCodes.OK]: createSchema(schema, ReasonPhrases.OK),
    ...ErrorByIdResponseSchema
  }
}

export default getByIdResponseSchema
