export const userUpdate = {
  patch: {
    tags: ['User CRUD operations'],
    description: 'Update User',
    operationId: 'updateUser',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id'
        },
        required: true,
        description: 'Id of User to be updated'
      }
    ],
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
      200: {
        description: 'User updated successfully'
      },
      400: {
        description: 'Bad Request'
      },
      403: {
        description: 'Forbidden'
      },
      404: {
        description: 'User not found'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}
