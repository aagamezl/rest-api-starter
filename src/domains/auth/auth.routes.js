const express = require('express')

// const { validate } = require('../../../utils')

const controller = require('./auth.controller')
// const validations = require('./auth.validations')

const userController = require('./../user/user.controller')
// const userValidations = require('./../user/user.validations')

const router = express.Router({
  strict: true
})

router.post('/login', /* validate(validations.login), */ controller.login)

router.post('/logout', controller.logout)

router.post('/signup', /* validate(userValidations.create), */ userController.create)

module.exports = router
