export const schema = {
  type: 'object',
  properties: {
    status: {
      type: 'string'
    },
    version: {
      type: 'string'
    },
    releaseId: {
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
        uptime: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              componentType: {
                type: 'string'
              },
              observedValue: {
                type: 'number',
                format: 'double'
              },
              observedUnit: {
                type: 'string'
              },
              status: {
                type: 'string'
              },
              time: {
                type: 'string',
                format: 'date-time'
              }
            }
          }
        },
        'cpu:utilization': {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              componentId: {
                type: 'string'
              },
              node: {
                type: 'integer'
              },
              componentType: {
                type: 'string'
              },
              observedValue: {
                type: 'integer'
              },
              observedUnit: {
                type: 'string'
              },
              status: {
                type: 'string'
              },
              time: {
                type: 'string',
                format: 'date-time'
              }
            }
          }
        },
        'memory:utilization': {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              componentId: {
                type: 'string'
              },
              node: {
                type: 'integer'
              },
              componentType: {
                type: 'string'
              },
              observedValue: {
                type: 'number',
                format: 'double'
              },
              observedUnit: {
                type: 'string'
              },
              status: {
                type: 'string'
              },
              time: {
                type: 'string',
                format: 'date-time'
              }
            }
          }
        },
        'db:provider:responseTime': {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              componentId: {
                type: 'string'
              },
              componentType: {
                type: 'string'
              },
              observedValue: {
                type: 'integer'
              },
              observedUnit: {
                type: 'string'
              },
              status: {
                type: 'string'
              },
              time: {
                type: 'string',
                format: 'date-time'
              }
            }
          }
        }
      }
    },
    lingks: {
      type: 'object',
      properties: {
        about: {
          type: 'string'
        }
      }
    }
  }
}
