import { makeSchemaOptional, SEGMENTS } from '../../utils/index.js'
import { postId, input } from './index.js'

export const validations = {
  // POST /posts
  create: {
    [SEGMENTS.BODY]: input
  },
  // DELETE /posts/:id
  delete: {
    [SEGMENTS.PARAMS]: postId
  },
  // GET /posts/:id
  getById: {
    [SEGMENTS.PARAMS]: postId
  },
  // PATCH /posts/:id
  update: {
    [SEGMENTS.PARAMS]: postId,
    [SEGMENTS.BODY]: makeSchemaOptional(input)
  }
}
