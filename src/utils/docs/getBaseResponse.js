/**
 *
 * @param {Record<string, unknown>} schema
 * @returns
 */
export const getBaseResponse = (schema) => {
  return {
    type: 'object',
    properties: {
      items: schema,
      count: {
        type: 'number',
        format: 'float'
      }
    },
    required: ['items', 'count'],
    additionalProperties: false
  }
}
