import fastify from 'fastify'

const buildApp = (opts = {}) => {
  const app = fastify(opts)

  app.get('/', async function (request, reply) {
    return { hello: 'world' }
  })

  return app
}

export default buildApp
