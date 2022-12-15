import { internalServerError } from '../responses/internal-server-error.js'

export const healthCheck = {
  get: {
    tags: ['Health Check'],
    description: 'Get the API health check',
    operationId: 'getHealthCheck',
    security: [
      {
        bearerAuth: []
      }
    ],
    responses: {
      200: {
        description: 'Health check is obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/HealthCheck'
            }
          }
        }
      },
      [internalServerError.httpCode]: internalServerError.description
    }
  }
}
