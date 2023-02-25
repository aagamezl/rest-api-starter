import { schema as healthSchema } from '../domains/health/health.schema.js'
import { schema as userSchema } from '../domains/users/users.schema.js'

export const components = {
  components: {
    schemas: {
      id: {
        type: 'string',
        format: 'uuid',
        description: 'User identification number',
        example: 'dd84fbdc-33c6-4948-bb56-34d139bf811f'
      },
      User: userSchema.user,
      UserInput: userSchema.input,
      HealthCheck: healthSchema,
      ErrorDetails: {
        type: 'object',
        properties: {
          source: {
            type: 'string'
          },
          errors: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ErrorDetailsItem'
            }
          }
        }
      },
      ErrorDetailsItem: {
        type: 'object',
        properties: {
          key: {
            type: 'string'
          },
          message: {
            type: 'string'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          status: {
            type: 'integer'
          },
          title: {
            type: 'string'
          },
          details: {
            $ref: '#/components/schemas/ErrorDetails'
          }
        },
        example: {
          status: 400,
          title: 'Bad Request',
          details: {
            source: 'body',
            errors: [
              {
                key: 'email',
                message: '\'email\' is required'
              },
              {
                key: 'emai1l',
                message: '\'email\' is not allowed'
              }
            ]
          }
        }
      }
    }
  }
}
