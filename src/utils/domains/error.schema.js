import { ReasonPhrases } from 'http-status-codes'
import { Type } from '@sinclair/typebox'

/**
 *
 * @param {string} description
 * @returns {import('@sinclair/typebox').TObject}
 */
export const errorSchema = (description) => {
  return Type.Object(
    {
      statusCode: Type.Number(),
      code: Type.String(),
      error: Type.String(),
      message: Type.String()
    },
    { description }
  )
}

export const BaseErrorResponse = {
  400: errorSchema(ReasonPhrases.BAD_REQUEST),
  500: errorSchema(ReasonPhrases.INTERNAL_SERVER_ERROR)
}

export const BaseByIdErrorResponse = {
  404: errorSchema(ReasonPhrases.NOT_FOUND),
  ...BaseErrorResponse
}
