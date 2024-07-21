import DeleteByIdSchema from '../../utils/domains/schemas/response/schemas/delete-by-id-response.schema.js'
import getByIdResponseSchema from '../../utils/domains/schemas/response/get-by-id-response.schema.js'
import responseSchemaForCreate from '../../utils/domains/schemas/response/create-response.schema.js'
import responseSchemaForGetAll from '../../utils/domains/schemas/response/get-all-response.schema.js'
import { REQUEST_SEGMENTS } from '../../utils/index.js'
import {
  CreateUserSchema,
  IdUserSchema,
  UpdateUserSchema
  // loginUserSchema,
} from './index.js'

const validations = {
  // POST /users
  create: {
    [REQUEST_SEGMENTS.BODY]: CreateUserSchema,
    [REQUEST_SEGMENTS.RESPONSE]: responseSchemaForCreate({ $ref: 'User' })
  },
  // DELETE /users/:id
  delete: {
    [REQUEST_SEGMENTS.PARAMS]: IdUserSchema,
    [REQUEST_SEGMENTS.RESPONSE]: DeleteByIdSchema
  },
  // GET /users
  getAll: {
    [REQUEST_SEGMENTS.RESPONSE]: responseSchemaForGetAll({ $ref: 'User' })
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

export default validations
