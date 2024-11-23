import {
  REQUEST_SEGMENTS,
  createAllResponseSchema,
  createDeleteByIdResponseSchema,
  createByIdResponseSchema,
  createResponseSchema,
  createJsonApiQuerySchema
} from '../../common/index.js'
import {
  CreateUserSchema,
  IdUserSchema,
  UpdateUserSchema,
  UserSelectSchema
} from './index.js'

export const validations = {
  // POST /users
  create: {
    [REQUEST_SEGMENTS.BODY]: CreateUserSchema,
    [REQUEST_SEGMENTS.RESPONSE]: createResponseSchema({ $ref: 'User' }, 'User')
  },
  // DELETE /users/:id
  delete: {
    [REQUEST_SEGMENTS.PARAMS]: IdUserSchema,
    [REQUEST_SEGMENTS.RESPONSE]: createDeleteByIdResponseSchema()
  },
  // GET /users
  getAll: {
    [REQUEST_SEGMENTS.QUERY]: createJsonApiQuerySchema(),
    [REQUEST_SEGMENTS.RESPONSE]: createAllResponseSchema(UserSelectSchema, 'Users')
  },
  // GET /users/:id
  getById: {
    [REQUEST_SEGMENTS.PARAMS]: IdUserSchema,
    [REQUEST_SEGMENTS.RESPONSE]: createByIdResponseSchema({ $ref: 'User' })
  },
  // PATCH /users/:id
  patch: {
    [REQUEST_SEGMENTS.PARAMS]: IdUserSchema,
    [REQUEST_SEGMENTS.BODY]: UpdateUserSchema,
    [REQUEST_SEGMENTS.RESPONSE]: createByIdResponseSchema({ $ref: 'User' })
  },
  // PUT /users/:id
  put: {
    [REQUEST_SEGMENTS.PARAMS]: IdUserSchema,
    [REQUEST_SEGMENTS.BODY]: CreateUserSchema,
    [REQUEST_SEGMENTS.RESPONSE]: createByIdResponseSchema({ $ref: 'User' })
  }
}
