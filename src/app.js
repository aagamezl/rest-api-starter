import Swagger from '@fastify/swagger'
import SwaggerUI from '@fastify/swagger-ui'
import cors from '@fastify/cors'
import csrfProtection from '@fastify/csrf-protection'
import fastify from 'fastify'
import fastifyCompress from '@fastify/compress'
import helmet from '@fastify/helmet'
import { StatusCodes } from 'http-status-codes'

import { config } from '../config/index.js'
import { definition } from './openapi/definition.js'
// // import postsRoutes from './domains/posts/posts.routes.js'
import { routes as usersRoutes } from './domains/users/users.routes.js'
import { PROBLEM_CONTENT_TYPE } from './utils/index.js'

export const app = fastify({
  logger: config.logger[process.env.NODE_ENV]
})

app.setErrorHandler(function (error, request, reply) {
  if (error.validation) {
    // localize.ru(error.validation)
    reply.header('Content-Type', PROBLEM_CONTENT_TYPE).status(400).send(error.validation)
    return
  }

  reply.send(error)
})

/**
 * An attacker could search for valid URLs if your 404 error handling is not rate limited. To rate
 * limit your 404 response, you can use a custom handler
 */
app.setNotFoundHandler((request, reply) => {
  reply.code(StatusCodes.NOT_FOUND).send()
})

// Response compression
await app.register(fastifyCompress, config.compression)

// Security measures
await app.register(csrfProtection)
await app.register(helmet)
await app.register(cors)

app.register(Swagger, definition)

app.register(SwaggerUI)

// // Domains Routes
// // app.register(postsRoutes)
app.register(usersRoutes)
