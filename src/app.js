import Swagger from '@fastify/swagger'
import SwaggerUI from '@fastify/swagger-ui'
import cors from '@fastify/cors'
import csrfProtection from '@fastify/csrf-protection'
import fastify from 'fastify'
import fastifyCompress from '@fastify/compress'
import helmet from '@fastify/helmet'
import { StatusCodes } from 'http-status-codes'

import config from '../config/index.js'

// import postsRoutes from './domains/posts/posts.routes.js'
import usersRoutes from './domains/users/users.routes.js'

const app = fastify({
  logger: config.logger[process.env.NODE_ENV]
})

// Response compression
await app.register(fastifyCompress, config.compression)

// Security measures
await app.register(csrfProtection)
await app.register(helmet)
await app.register(cors)

/**
 * An attacker could search for valid URLs if your 404 error handling is not rate limited. To rate
 * limit your 404 response, you can use a custom handler
 */
app.setNotFoundHandler((request, reply) => {
  reply.code(StatusCodes.NOT_FOUND).send()
})

app.register(Swagger, {
  openapi: {
    openapi: '3.1.0',
    info: {
      title: 'Rest API Starter',
      description: 'Rest API Starter',
      version: '0.1.0'
    },
    tags: [
      { name: 'Users', description: 'Users related end-points' }
      // {
      //   name: 'Posts',
      //   description: 'Posts related end-points'
      // }
    ]
  }
})

app.register(SwaggerUI)

// Domains Routes
// app.register(postsRoutes)
app.register(usersRoutes)

export default app
