export const createJsonApiQuerySchema = () => {
  return {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'JsonApiQuery',
    type: 'object',
    properties: {
      include: {
        type: 'string',
        description: 'Sorting criteria.',
        examples: [
          'user,ratings',
          'user,comment.author'
        ]
      },
      fields: {
        type: 'object',
        additionalProperties: {
          type: 'string'
        },
        examples: [
          'fields[articles]=user,ratings',
          'fields[articles]=user,comment.author'
        ]
      },
      sort: {
        type: 'object',
        additionalProperties: {
          type: 'string'
        },
        examples: [
          'sort=first_name',
          'sort=-created_at'
        ]
      },
      filter: {
        type: 'object',
        additionalProperties: {
          type: 'string'
        },
        examples: [
          'filter[name]=john',
          'filter[age][lt]=15',
          'filter[not][name]=jack'
        ]
      },
      page: {
        type: 'object',
        additionalProperties: {
          type: 'number'
        },
        examples: [
          '[page][number]=1',
          'page[size]=50'
        ]
      }
    }
  }
}
