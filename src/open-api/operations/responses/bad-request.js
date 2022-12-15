import { StatusCodes, ReasonPhrases } from 'http-status-codes'

export const badRequest = () => {
  return {
    [StatusCodes.INTERNAL_SERVER_ERROR]: {
      description: ReasonPhrases.BAD_REQUEST
    }
  }
}
