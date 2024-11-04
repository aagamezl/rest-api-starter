import {
  DeleteByIdSchema,
  REQUEST_SEGMENTS,
  getByIdResponseSchema,
  createResponseSchema,
  getAllResponseSchema
} from '../../utils/index.js'
import {
  CreateUserSchema,
  IdUserSchema,
  UpdateUserSchema
} from './index.js'

export const validations = {
  // POST /users
  create: {
    [REQUEST_SEGMENTS.BODY]: CreateUserSchema,
    [REQUEST_SEGMENTS.RESPONSE]: createResponseSchema({ $ref: 'User' })
  },
  // DELETE /users/:id
  delete: {
    [REQUEST_SEGMENTS.PARAMS]: IdUserSchema,
    [REQUEST_SEGMENTS.RESPONSE]: DeleteByIdSchema
  },
  // GET /users
  getAll: {
    [REQUEST_SEGMENTS.RESPONSE]: getAllResponseSchema({ $ref: 'User' })
  },
  // GET /users/:id
  getById: {
    [REQUEST_SEGMENTS.PARAMS]: IdUserSchema,
    [REQUEST_SEGMENTS.RESPONSE]: getByIdResponseSchema({ $ref: 'User' })
  },
  // PATCH /users/:id
  patch: {
    [REQUEST_SEGMENTS.PARAMS]: IdUserSchema,
    [REQUEST_SEGMENTS.BODY]: UpdateUserSchema,
    [REQUEST_SEGMENTS.RESPONSE]: getByIdResponseSchema({ $ref: 'User' })
  }
}
