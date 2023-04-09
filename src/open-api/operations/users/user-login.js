export const userLogin = {
  post: {
    tags: ['User CRUD operations'],
    description: 'Login User',
    operationId: 'loginUser',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UserLogin'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'User login successfully'
      },
      400: {
        description: 'Bad Request'
      },
      404: {
        description: 'Not Found'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}
