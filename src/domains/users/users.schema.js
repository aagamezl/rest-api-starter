import joi from 'joi'
import joiToSwagger from 'joi-to-swagger'

export const userId = joi.object({
  id: joi.string().guid({ version: 'uuidv4' })
})

export const userInput = joi.object({
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
  }).unknown(false)),
  role: joi.string().valid('USER', 'ADMIN').default('USER').required(),
  isAdmin: joi.boolean().default(false).required(),
  favoriteColors: joi.array().items(joi.string()).default(['red', 'blue', 'green']).required()
}).unknown(false)

const userSchema = joiToSwagger(userId.concat(userInput)).swagger

export const userLogin = joi.object({
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi.string().required().min(8).max(36)
}).unknown(false)

export const schema = {
  user: userSchema,
  input: joiToSwagger(userInput).swagger,
  login: joiToSwagger(userLogin).swagger
}
