import joi from 'joi'
import joiToSwagger from 'joi-to-swagger'

import { getBaseResponse } from '../../utils/docs/getBaseResponse.js'

export const postId = joi.object({
  id: joi.string().guid({ version: 'uuidv4' })
})

export const post = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  published: joi.boolean().default(false).required(),
  authorId: joi.string().required()
}).unknown(false)

export const postSchema = joiToSwagger(postId.concat(post)).swagger
export const postInput = joiToSwagger(post).swagger
export const responseAll = getBaseResponse(postSchema)
