import { randomBytes } from 'node:crypto'

const config = {
  authentication: {
    secret: process.env.TOKEN_SECRET ?? randomBytes(20).toString('hex'),
    expiresIn: Number(process.env.EXPIRES_IN ?? 3600)
  },
  server: {
    hostname: process.env.HOSTNAME,
    port: process.env.PORT ?? 3000,
    environment: process.env.NODE_ENV ?? 'development',
    version: '0.0.1'
  },
  database: {
    pagination: {
      limit: 20
    }
  }
}

export default config
