import express from 'express'

import { authenticate, validate } from '../../utils/index.js'

import { controller } from './posts.controller.js'
import { validations } from './posts.validation.js'

export const router = express.Router({
  strict: true
})

router.post('/posts', authenticate, validate(validations.create), controller.create)

router.get('/posts', authenticate, controller.getAll)

router.get('/posts/:id', [authenticate, validate(validations.getById)], controller.getById)

router.delete('/posts/:id', [authenticate, validate(validations.delete)], controller.deleteById)

router.patch('/posts/:id', [authenticate, validate(validations.update)], controller.update)
