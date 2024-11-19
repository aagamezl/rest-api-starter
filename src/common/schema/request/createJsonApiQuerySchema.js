export const createJsonApiQuerySchema = () => {
  return {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'JsonApiQuery',
    type: 'object',
    properties: {
      queryData: {
        type: 'object',
        properties: {
          sort: {
            type: 'string',
            description: 'Sorting criteria.',
            examples: [
              'first_name, -last_name'
            ]
          },
          limit: {
            type: 'number',
            description: 'Pagination limit.'
          },
          offset: {
            type: 'number',
            description: 'Pagination offset.'
          }
        }
      }
    }
  }
}
