import { Router } from 'express'

import { router as apiDocsRouter } from './domains/api-docs/api-docs.routes.js'
import { router as statusRouter } from './domains/health/health.routes.js'
import { router as usersRouter } from './domains/users/users.routes.js'

export const router = Router()

router.use('/', apiDocsRouter)
router.use('/', statusRouter)
router.use('/', usersRouter)
