import { getAll } from '../queryParameter.js'
// import { schema } from '../../../domains/user/user.schema.js'

export const userGetAll = {
  get: {
    tags: ['User CRUD operations'],
    description: 'Get Users',
    operationId: 'getUsers',
    parameters: getAll,
    security: [
      {
        bearerAuth: []
      }
    ],
    responses: {
      // 200: {
      //   description: 'Users were obtained',
      //   content: {
      //     'application/json': {
      //       schema: schema.responseAll
      //     }
      //   }
      // },
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
