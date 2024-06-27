import { REQUEST_SEGMENTS } from '../../utils/index.js'
import {
  createUserSchema,
  idUserSchema,
  updateUserSchema,
  loginUserSchema,
  usersCreateResponseSchema,
  usersGetByIdResponseSchema,
  usersDeleteResponseSchema
} from './index.js'

const validations = {
  // POST /users
  create: {
    [REQUEST_SEGMENTS.BODY]: createUserSchema,
    [REQUEST_SEGMENTS.RESPONSE]: usersCreateResponseSchema
  },
  // DELETE /users/:id
  delete: {
    [REQUEST_SEGMENTS.PARAMS]: idUserSchema,
    [REQUEST_SEGMENTS.RESPONSE]: usersDeleteResponseSchema
  },
  // DELETE /users/:id
  getAll: {
    [REQUEST_SEGMENTS.RESPONSE]: usersDeleteResponseSchema
  },
  // GET /users/:id
  getById: {
    [REQUEST_SEGMENTS.PARAMS]: idUserSchema,
    [REQUEST_SEGMENTS.RESPONSE]: usersGetByIdResponseSchema
  },
  // GET /users/login
  login: {
    [REQUEST_SEGMENTS.BODY]: loginUserSchema
  },
  // PATCH /users/:id
  update: {
    [REQUEST_SEGMENTS.PARAMS]: idUserSchema,
    [REQUEST_SEGMENTS.BODY]: updateUserSchema,
    [REQUEST_SEGMENTS.RESPONSE]: usersGetByIdResponseSchema
  }
}

export default validations
