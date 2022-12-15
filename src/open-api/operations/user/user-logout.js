export const userLogout = {
  post: {
    tags: ['User CRUD operations'],
    description: 'Logout User',
    operationId: 'logoutUser',
    parameters: [],
    requestBody: {},
    responses: {
      201: {
        description: 'User logout successfully'
      },
      400: {
        description: 'Bad Request'
      },
      403: {
        description: 'Forbidden'
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
