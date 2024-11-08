import { ReasonPhrases } from 'http-status-codes'

/**
 *
 * @param {object} [description] // TODO: create correct type
 * @returns {object} // TODO: create correct type
 */
export const createNoContentSchema = (description = ReasonPhrases.NO_CONTENT) => {
  return {
    type: 'null',
    description
  }
}
