import { controller } from './users.controller.js'
import { validations } from './index.js'
import { addSchemas } from '../../utils/index.js'

/**
 * @param {import('fastify').FastifyInstance} app
 */
export const routes = async (app) => {
  addSchemas(app, 'users')

  app.post(
    '/users',
    { schema: { ...validations.create, tags: ['Users'] } },
    controller.create
  )

  app.get(
    '/users',
    { schema: { ...validations.getAll, tags: ['Users'] } },
    controller.getAll
  )

  app.get(
    '/users/:id',
    { schema: { ...validations.getById, tags: ['Users'] } },
    controller.getById
  )

  app.delete(
    '/users/:id',
    { schema: { ...validations.delete, tags: ['Users'] } },
    controller.deleteById
  )

  app.patch(
    '/users/:id',
    { schema: { ...validations.patch, tags: ['Users'] } },
    controller.patch
  )
}
