import authenticate from '../../utils/hooks/authenticate.js'
import PostsController from './PostsController.js'
import PostsModel from './PostsModel.js'
import { posts, validations } from './index.js'

/**
 * @param {import('fastify').FastifyInstance} app
 */
export default async (app) => {
  const model = new PostsModel(posts, {
    excludedFields: 'password'
  })
  const controller = new PostsController(model)

  app.post('/posts', { schema: validations.create }, async (request, reply) => {
    return controller.create(request, reply)
  })

  app.get('/posts', { preParsing: authenticate }, async (request, reply) => {
    return controller.getAll(request, reply)
  })

  app.get('/posts/:id', {
    preParsing: authenticate,
    schema: { params: validations.getById }
  }, async (request, reply) => {
    return controller.getById(request, reply)
  })

  app.delete('/posts/:id', { preParsing: authenticate }, async (request, reply) => {
    return controller.delete(request, reply)
  })

  app.patch('/posts/:id', {
    preParsing: authenticate,
    schema: validations.update
  }, async (request, reply) => {
    return controller.update(request, reply)
  })
}
