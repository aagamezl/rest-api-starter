import { Router } from 'express'

import { router as apiDocsRouter } from './domains/api-docs/api-docs.routes.js'
import { router as postsRouter } from './domains/posts/posts.routes.js'
import { router as healthRouter } from './domains/health/health.routes.js'
import { router as usersRouter } from './domains/users/users.routes.js'

export const router = Router()

router.use('/', apiDocsRouter)
router.use('/', healthRouter)
router.use('/', postsRouter)
router.use('/', usersRouter)

// console.log(dirname(import.meta.url).split(sep).at(-1))

// console.log(router.stack.reduce((operations, layer) => {
//   (operations[layer.route.path] ??= []).push(layer.route.stack.at(-1).name)

//   return operations
// }, {}))
