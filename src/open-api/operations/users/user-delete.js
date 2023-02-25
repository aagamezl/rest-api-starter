export const userDelete = {
  delete: {
    tags: ['User CRUD operations'],
    description: 'Deleting a User',
    operationId: 'deleteUser',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id'
        },
        required: true,
        description: 'Deleting a User'
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ],
    responses: {
      200: {
        description: 'User deleted successfully'
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
