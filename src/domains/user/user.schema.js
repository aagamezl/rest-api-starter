import joi from 'joi'
import joiToSwagger from 'joi-to-swagger'

import { getBaseResponse } from './../../utils/docs/getBaseResponse.js'

export const userId = joi.object({
  id: joi.string().guid({ version: 'uuidv4' }).required()
})

export const userInput = joi.object({
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  password: joi.string().required().min(8).max(36)
}).unknown(false)

export const userLogin = joi.object({
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi.string().required().min(8).max(36)
}).unknown(false)

const user = userId.concat(userInput)
const userSchema = joiToSwagger(user).swagger

export const schema = {
  user: userSchema,
  login: joiToSwagger(userLogin).swagger,
  input: joiToSwagger(userInput).swagger,
  responseAll: getBaseResponse(userSchema)
}
