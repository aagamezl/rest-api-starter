import express from 'express'

import * as controller from './health.controller.js'

export const router = express.Router({
  strict: true
})

router.get('/health', controller.health)
