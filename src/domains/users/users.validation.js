import {
  REQUEST_SEGMENTS,
  createAllResponseSchema,
  createDeleteByIdResponseSchema,
  createGetByIdResponseSchema,
  createResponseSchema
} from '../../common/index.js'
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
    [REQUEST_SEGMENTS.RESPONSE]: createDeleteByIdResponseSchema()
  },
  // GET /users
  getAll: {
    [REQUEST_SEGMENTS.RESPONSE]: createAllResponseSchema({ $ref: 'User' })
  },
  // GET /users/:id
  getById: {
    [REQUEST_SEGMENTS.PARAMS]: IdUserSchema,
    [REQUEST_SEGMENTS.RESPONSE]: createGetByIdResponseSchema({ $ref: 'User' })
  },
  // PATCH /users/:id
  patch: {
    [REQUEST_SEGMENTS.PARAMS]: IdUserSchema,
    [REQUEST_SEGMENTS.BODY]: UpdateUserSchema,
    [REQUEST_SEGMENTS.RESPONSE]: createGetByIdResponseSchema({ $ref: 'User' })
  }
}
