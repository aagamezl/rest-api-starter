import { StatusCodes, ReasonPhrases } from 'http-status-codes'

export const internalServerError = () => {
  return {
    [StatusCodes.INTERNAL_SERVER_ERROR]: {
      description: ReasonPhrases.INTERNAL_SERVER_ERROR
    }
  }
}
