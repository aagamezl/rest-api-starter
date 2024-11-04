import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { errorSchema } from '../../index.js'
import { ErrorResponseSchema } from './error-response.schema.js'

export const ErrorByIdResponseSchema = {
  [StatusCodes.NOT_FOUND]: errorSchema(ReasonPhrases.NOT_FOUND),
  ...ErrorResponseSchema
}
