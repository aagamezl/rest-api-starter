import { StatusCodes } from 'http-status-codes'

import { NoContentSchema } from '../../../index.js'
import ErrorByIdResponseSchema from './error-by-id-response.schema.js'

/**
 *
 * @param {import('@sinclair/typebox').TObject} schema
 * @returns
 */
const DeleteByIdSchema = {
  [StatusCodes.NO_CONTENT]: NoContentSchema,
  ...ErrorByIdResponseSchema
}

export default DeleteByIdSchema
