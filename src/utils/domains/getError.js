import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export const getError = (error) => {
  return {
    type: 'about:blank',
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    title: ReasonPhrases.INTERNAL_SERVER_ERROR,
    details: error.message
  }
}
