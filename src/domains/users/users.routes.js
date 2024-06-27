// import authenticate from '../../utils/hooks/authenticate.js'
import controller from './users.controller.js'
import { /* users,  */validations } from './index.js'

/**
 * @param {import('fastify').FastifyInstance} app
 */
export default async (app) => {
  app.post('/users', { schema: { ...validations.create, tags: ['Users'] } }, controller.create)

  app.post('/users/login', { schema: { ...validations.login/* , tags: ['Users'] */ } }, controller.login)

  app.post('/users/logout', controller.logout)

  app.get('/users',
    { schema: { ...validations.getAll, tags: ['Users'] } },
    controller.getAll
  )

  app.get('/users/:id', { schema: { ...validations.getById, tags: ['Users'] } }, controller.getById)

  app.delete('/users/:id', { schema: { ...validations.delete, tags: ['Users'] } }, controller.deleteById)

  app.patch('/users/:id', { schema: { ...validations.update, tags: ['Users'] } }, controller.update)
}
