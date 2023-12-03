import express from 'express'

const { Router } = express

const router = Router()

router.get('/', (req, res) => {
  // Controller logic for the '/' route
})

router.post('/users', (req, res) => {
  // Controller logic for the '/users' route
})

router.put('/users/:id', (req, res) => {
  // Controller logic for the '/users/:id' route
})

const routes = []

router.stack.forEach((middleware) => {
  if (middleware.route) {
    // Handle regular routes
    routes.push({
      route: middleware.route.path,
      method: Object.keys(middleware.route.methods)[0].toUpperCase(),
      controller: middleware.route.stack[0].handle.toString()
    })
  } else if (middleware.name === 'router') {
    // Handle nested routers
    middleware.handle.stack.forEach((handler) => {
      routes.push({
        route: middleware.regexp.toString(),
        method: Object.keys(handler.route.methods)[0].toUpperCase(),
        controller: handler.route.stack[0].handle.toString()
      })
    })
  }
})

console.log(routes)
