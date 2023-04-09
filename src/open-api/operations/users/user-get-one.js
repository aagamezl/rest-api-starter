import { internalServerError } from '../responses/internal-server-error.js'
import { notFound } from '../responses/not-found.js'

export const userGetOne = {
  get: {
    tags: ['User CRUD operations'],
    description: 'Get a User',
    operationId: 'getUser',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id'
        },
        required: true,
        description: 'A single User id'
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ],
    responses: {
      200: {
        description: 'User is obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User'
            }
          }
        }
      },
      400: {
        description: 'Bad Request'
      },
      403: {
        description: 'Forbidden'
      },
      ...notFound('User'),
      ...internalServerError()
    }
  }
}
