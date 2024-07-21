import { randomBytes } from 'node:crypto'

const config = {
  application: {
    name: 'Rest API Starter',
    description: 'Rest API Starter',
    version: '1.3.0'
  },
  authentication: {
    secret: process.env.TOKEN_SECRET ?? randomBytes(20).toString('hex'),
    expiresIn: Number(process.env.EXPIRES_IN ?? 3600)
  },
  server: {
    hostname: '::',
    port: process.env.PORT ?? 3000,
    environment: process.env.NODE_ENV ?? 'development',
    version: '1.0.0'
  },
  database: {
    pagination: {
      limit: 50
    }
  },
  logger: {
    path: './logs'
    // development: {
    //   // transport: {
    //   //   target: 'pino-pretty',
    //   //   options: {
    //   //     translateTime: 'HH:MM:ss Z',
    //   //     ignore: 'pid,hostname'
    //   //   }
    //   // },
    //   level: 'info',
    // },
    // production: true,
    // test: false
  }
}

export default config
