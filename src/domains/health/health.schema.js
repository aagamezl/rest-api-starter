export const schema = {
  type: 'object',
  properties: {
    status: {
      type: 'string'
    },
    version: {
      type: 'string'
    },
    serviceId: {
      type: 'string',
      format: 'uuid',
      example: 'dd84fbdc-33c6-4948-bb56-34d139bf811f'
    },
    description: {
      type: 'string'
    },
    checks: {
      type: 'object',
      properties: {
        'api:responseTime': {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              componentId: {
                type: 'string'
              },
              status: {
                type: 'string'
              },
              time: {
                type: 'integer',
                format: 'unix-timestamp'
              }
            }
          }
        }
      }
    }
  }
}
