import { randomBytes } from 'node:crypto'

export const config = {
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
    type: process.env.DATABASE_TYPE ?? 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    pagination: {
      limit: 20
    }
  }
}
