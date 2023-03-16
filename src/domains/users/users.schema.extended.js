import joi from 'joi'
import joiToSwagger from 'joi-to-swagger'

export const userLogin = joi.object({
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi.string().required().min(8).max(36)
}).unknown(false)

export const loginSchema = joiToSwagger(userLogin).swagger

// export const schema = {
//   login: joiToSwagger(userLogin).swagger
// }
