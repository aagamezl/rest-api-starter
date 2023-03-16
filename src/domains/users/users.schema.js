import joi from 'joi'
import joiToSwagger from 'joi-to-swagger'

import { getBaseResponse } from '../../utils/docs/getBaseResponse.js'

export const userId = joi.object({
  id: joi.string().guid({ version: 'uuidv4' })
})

export const user = joi.object({
  name: joi.string().required(),
  lastname: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().required(),
  age: joi.number().optional(),
  posts: joi.array().items(joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
    published: joi.boolean().default(false).required(),
    authorId: joi.string().required()
  }).unknown(false))
}).unknown(false)

export const userSchema = joiToSwagger(userId.concat(user)).swagger
export const userInput = joiToSwagger(user).swagger
export const responseAll = getBaseResponse(userSchema)

// export const schema = {
//   user: userSchema,
//   input: joiToSwagger(userInput).swagger
// }
