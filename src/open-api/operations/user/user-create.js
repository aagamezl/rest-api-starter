export const userCreate = {
  post: {
    tags: ['User CRUD operations'],
    description: 'Create User',
    operationId: 'createUser',
    parameters: [],
    security: [
      {
        bearerAuth: []
      }
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UserInput'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'User created successfully'
      },
      400: {
        description: 'Bad Request'
      },
      403: {
        description: 'Forbidden'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}
