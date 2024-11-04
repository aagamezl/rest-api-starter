import { StatusCodes } from 'http-status-codes'

import { ErrorByIdResponseSchema } from './error-by-id-response.schema.js'
import { NoContentSchema } from './no-content-response.schema.js'

/**
 *
 * @param {import('@sinclair/typebox').TObject} schema
 * @returns
 */
export const DeleteByIdSchema = {
  [StatusCodes.NO_CONTENT]: NoContentSchema,
  ...ErrorByIdResponseSchema
}
