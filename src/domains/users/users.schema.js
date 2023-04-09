import joi from 'joi'
import joiToSwagger from 'joi-to-swagger'

import { getBaseResponse } from '../../utils/docs/getBaseResponse.js'

export const userId = joi.object({
  id: joi.string().guid({ version: 'uuidv4' })
})

export const input = joi.object({
  firstname: joi.string().required(),
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

export const user = joi.object({
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().required(),
  age: joi.number().optional(),
  posts: joi.array().items(joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
    published: joi.boolean().default(false).required(),
    authorId: joi.string().required()
  }).unknown(false)),
  createdAt: joi.date().required(),
  updatedAt: joi.date().required()
}).unknown(false)

export const userSchema = joiToSwagger(userId.concat(user)).swagger
export const userInput = joiToSwagger(input).swagger
export const responseAll = getBaseResponse(userSchema)
