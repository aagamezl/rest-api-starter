const { Segments } = require('./../../utils')

const { authInput } = require('./auth.schema')

module.exports = {
  // POST /v1.0/login
  login: {
    [Segments.BODY]: authInput
  }
}
