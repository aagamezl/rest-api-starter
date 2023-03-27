const joi = require('joi')
const joiToSwagger = require('joi-to-swagger')

const authInput = joi.object({
  email: joi.string().email({ minDomainSegments: 2 }),
  password: joi.string().required().min(8).max(36)
}).unknown(false)

const authInputSchema = joiToSwagger(authInput).swagger

module.exports = {
  authInput,
  schema: {
    input: authInputSchema
  }
}
