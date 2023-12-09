import { REQUEST_SEGMENTS } from '../../utils/index.js'
import { idUserSchema, insertUserSchema, loginUser, updateUserSchema } from './users.schema.js'

const validations = {
  // POST /users
  create: {
    [REQUEST_SEGMENTS.BODY]: insertUserSchema
  },
  // DELETE /users/:id
  delete: {
    [REQUEST_SEGMENTS.PARAMS]: idUserSchema
  },
  // GET /users/:id
  getById: {
    [REQUEST_SEGMENTS.PARAMS]: idUserSchema
  },
  // GET /users/login
  login: {
    [REQUEST_SEGMENTS.BODY]: loginUser
  },
  // PATCH /users/:id
  update: {
    [REQUEST_SEGMENTS.PARAMS]: idUserSchema,
    [REQUEST_SEGMENTS.BODY]: updateUserSchema
  }
}

export default validations
