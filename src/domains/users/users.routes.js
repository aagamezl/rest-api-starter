import express from 'express'

import { authenticate, validate } from '../../utils/index.js'

import { controller } from './users.controller.js'
import { validations } from './users.validation.js'

export const router = express.Router({
  strict: true
})

router.post('/users', validate(validations.create), controller.create)

router.post('/users/login', validate(validations.login), controller.login)

router.post('/users/logout', authenticate, controller.logout)

router.get('/users', authenticate, controller.getAll)

router.get('/users/:id', [authenticate, validate(validations.getById)], controller.getById)

router.delete('/users/:id', [authenticate, validate(validations.delete)], controller.delete)

router.patch('/users/:id', [authenticate, validate(validations.update)], controller.update)
