const controller = require('./auth.controller')
const model = require('./auth.model')
const router = require('./auth.routes')
const schema = require('./auth.schema')
const validation = require('./auth.validation')

module.exports = {
  controller,
  model,
  router,
  ...schema,
  validation
}
