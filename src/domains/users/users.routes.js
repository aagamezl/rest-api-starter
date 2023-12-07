import UsersController from './UsersController.js'
import UsersModel from './UsersModel.js'
import users from './users.schema.js'

export default async (app) => {
  const model = new UsersModel(users, {
    excludedFields: 'password'
  })
  const controller = new UsersController(model)

  app.post('/users', async (request, reply) => {
    return controller.create(request, reply)
  })

  app.post('/users/login', async (request, reply) => {
    return controller.login(request, reply)
  })

  app.post('/users/logout', async (request, reply) => {
    return controller.logout(request, reply)
  })

  app.get('/users', async (request, reply) => {
    return controller.getAll(request, reply)
  })

  app.get('/users/:id', async (request, reply) => {
    return controller.getById(request, reply)
  })

  app.delete('/users/:id', async (request, reply) => {
    return controller.delete(request, reply)
  })

  app.patch('/users/:id', async (request, reply) => {
    return controller.update(request, reply)
  })
}
