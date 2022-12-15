import { StatusCodes } from 'http-status-codes'

export const notFound = (entity) => {
  return {
    [StatusCodes.NOT_FOUND]: {
      description: `We can't find the ${entity}`,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error',
            example: {
              message: `We can't find the ${entity}`,
              internal_code: 'Invalid id'
            }
          }
        }
      }
    }
  }
}
