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
  },
  compression: {
    inflateIfDeflated: true,
    threshold: 10,
    // requestEncodings: ['gzip'],
    removeContentLengthHeader: false,
    encodings: ['deflate', 'gzip']
  },
  rateLimit: {
    max: 21,
    timeWindow: '1 minute',
    // enableDraftSpec: true, // default false. Uses IEFT draft header standard
    addHeadersOnExceeding: { // default show all the response headers when rate limit is not reached
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true
    },
    addHeaders: { // default show all the response headers when rate limit is reached
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
      'retry-after': true
    }
  },
  logger: {
    development: {
      // transport: {
      //   target: 'pino-pretty',
      //   options: {
      //     translateTime: 'HH:MM:ss Z',
      //     ignore: 'pid,hostname'
      //   }
      // },
      level: 'info',
      file: './logs.log'
    },
    production: true,
    test: false
  }
}

export default config
