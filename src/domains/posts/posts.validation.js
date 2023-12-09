import { REQUEST_SEGMENTS } from '../../utils/index.js'
import { idPostSchema, insertPostSchema, updatePostSchema } from './posts.schema.js'

const validations = {
  // POST /posts
  create: {
    [REQUEST_SEGMENTS.BODY]: insertPostSchema
  },
  // DELETE /posts/:id
  delete: {
    [REQUEST_SEGMENTS.PARAMS]: idPostSchema
  },
  // GET /posts/:id
  getById: {
    [REQUEST_SEGMENTS.PARAMS]: idPostSchema
  },
  // PATCH /posts/:id
  update: {
    [REQUEST_SEGMENTS.PARAMS]: idPostSchema,
    [REQUEST_SEGMENTS.BODY]: updatePostSchema
  }
}

export default validations
