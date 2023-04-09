import { randomBytes } from 'node:crypto'

import { parseDatabaseUrl } from '../src/utils/parseDatabaseUrl.js'

const {
  provider,
  username,
  password,
  host,
  port,
  name,
  schema
} = parseDatabaseUrl(process.env.DATABASE_URL)

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
    username,
    password,
    name,
    schema,
    port,
    host,
    provider,
    pagination: {
      limit: 20
    }
  },
  schema: {
    user: ['createdAt', 'updatedAt'],
    post: ['createdAt', 'updatedAt']
  }
}
