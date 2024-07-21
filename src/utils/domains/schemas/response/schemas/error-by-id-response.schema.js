import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import errorSchema from '../../error-schema.js'
import ErrorResponseSchema from './error-response.schema.js'

const ErrorByIdResponseSchema = {
  [StatusCodes.NOT_FOUND]: errorSchema(ReasonPhrases.NOT_FOUND),
  ...ErrorResponseSchema
}

export default ErrorByIdResponseSchema
