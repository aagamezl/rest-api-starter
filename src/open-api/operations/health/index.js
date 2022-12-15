import { healthCheck } from './health-check.js'

export const healthOperations = {
  paths: {
    '/health': {
      ...healthCheck
    }
  }
}
