import { config } from './../../../config/index.js'

const base = () => {
  return {
    status: 'pass',
    version: config.server.version,
    serviceId: 'f03e522f-1f44-4062-9b55-9587f91c9c41',
    description: 'api service health check'
  }
}

export const check = () => {
  return {
    ...base(),
    checks: {
      ...server()
    }
  }
}

const server = () => {
  return {
    'api:responseTime': [{
      componentId: 'dfd6cf2b-1b6e-4412-a0b8-f6f7797a60d2',
      status: 'pass',
      time: Date.now()
    }]
  }
}
