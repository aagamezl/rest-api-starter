import { makeSchemaOptional, SEGMENTS } from '../../utils/index.js'
import { userId, userInput, userLogin } from './users.schema.js'

export const validations = {
  // POST /users
  create: {
    [SEGMENTS.BODY]: userInput
  },
  // DELETE /users/:id
  delete: {
    [SEGMENTS.PARAMS]: userId
  },
  // GET /users/:id
  getById: {
    [SEGMENTS.PARAMS]: userId
  },
  // GET /users/login
  login: {
    [SEGMENTS.BODY]: userLogin
  },
  // PATCH /users/:id
  update: {
    [SEGMENTS.PARAMS]: userId,
    [SEGMENTS.BODY]: makeSchemaOptional(userInput)
  }
}
