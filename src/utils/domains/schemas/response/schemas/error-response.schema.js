import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { errorSchema } from '../../index.js'
import { PROBLEM_CONTENT_TYPE } from '../../../constants.js'

export const ErrorResponseSchema = {
  // [StatusCodes.BAD_REQUEST]: errorSchema(ReasonPhrases.BAD_REQUEST),
  // [StatusCodes.BAD_REQUEST]: {
  //   description: ReasonPhrases.BAD_REQUEST,
  //   content: {
  //     [PROBLEM_CONTENT_TYPE]: {
  //       schema: {
  //         status: { type: 'number' },
  //         title: { type: 'string' },
  //         details: { type: 'string' }
  //       }
  //     }
  //   }
  // },
  [StatusCodes.BAD_REQUEST]: {
    description: ReasonPhrases.BAD_REQUEST,
    content: {
      [PROBLEM_CONTENT_TYPE]: {
        schema: {
          type: 'object',
          properties: {
            type: { type: 'string' },
            status: { type: 'number' },
            title: { type: 'string' },
            details: { type: 'string' }
          }
        }
      }
    }
  },
  [StatusCodes.INTERNAL_SERVER_ERROR]: errorSchema(ReasonPhrases.INTERNAL_SERVER_ERROR)
}
