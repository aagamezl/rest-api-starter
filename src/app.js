import fastifyCompress from '@fastify/compress'
import csrfProtection from '@fastify/csrf-protection'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

import config from '../config/index.js'
import buildApp from './utils/buildApp.js'

import postsRoutes from './domains/posts/posts.routes.js'
import usersRoutes from './domains/users/users.routes.js'

const app = buildApp({
  logger: config.logger[process.env.NODE_ENV]
})

// Response compression
await app.register(fastifyCompress, config.compression)

// Security measures
await app.register(csrfProtection)
await app.register(helmet)
await app.register(cors)
await app.register(rateLimit, config.rateLimit) // To avoid DDoS attacks and other related issues

/**
 * An attacker could search for valid URLs if your 404 error handling is not rate limited. To rate
 * limit your 404 response, you can use a custom handler
 */
app.setNotFoundHandler({
  preHandler: app.rateLimit()
}, (request, reply) => {
  reply.code(404).send()
})

await app.register(fastifySwagger, {
  mode: 'dynamic',
  openapi: {
    info: {
      title: String,
      description: String,
      version: String
    },
    externalDocs: Object,
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'The Bearer Authorization token'
        }
      }
    },
    security: [{
      bearerAuth: []
    }],
    tags: [
      { name: 'tag' }
    ]
  },
  exposeRoute: true,
  routePrefix: '/documentation',
  initOAuth: {},
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header
})

await app.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
  initOAuth: {},
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header
})

// Domains Routes
app.register(postsRoutes)
app.register(usersRoutes)

app.ready().then(() => {
  app.swagger()
})

export default app
