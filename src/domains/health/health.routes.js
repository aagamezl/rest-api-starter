import { Router } from 'express'

import * as controller from './health.controller.js'

export const router = Router({
  strict: true
})

router.get('/health', controller.health)
