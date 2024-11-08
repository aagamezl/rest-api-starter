import { PROBLEM_CONTENT_TYPE } from '../../index.js'

/**
 *
 * @param {string} description
 * @returns {object} // TODO: create correct type
 */
export const createProblemSchema = (description) => {
  return {
    description,
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
  }
}
