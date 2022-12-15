export const getAll = [{
  in: 'query',
  name: 'include',
  schema: {
    type: 'string'
  },
  description: 'The relations to include in the response'
}, {
  in: 'query',
  name: 'page',
  description: 'Allow to get the data using pagination',
  explode: true,
  style: 'deepObject',
  allowReserved: true,
  // example: '{ "limit": 100, "offset": 1 }',
  schema: {
    type: 'object',
    properties: {
      limit: {
        type: 'integer',
        description: 'The numbers of items to return',
        minimum: 1,
        maximum: 100,
        default: 20
      },
      offset: {
        type: 'integer',
        description: 'The number of items to skip before starting to collect the result set',
        minimum: 0,
        default: 0
      }
    }
  }
}]
