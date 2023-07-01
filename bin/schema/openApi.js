import Joi from 'joi'
import joiToSwagger from 'joi-to-swagger'

// const FooSchema = Joi.alternatives().try(Joi.link('#Bar1Schema'), Joi.link('#Bar2Schema')).id('FooSchema')

// const Bar1Schema = Joi.object().keys({ foo1: FooSchema }).id('Bar1Schema')
// const Bar2Schema = Joi.object().keys({ foo2: FooSchema }).id('Bar2Schema')

// const UsableFooSchema = FooSchema.shared(Bar1Schema).shared(Bar2Schema)

export const userId = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).required()
})

export const postInput = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  published: Joi.boolean().default(false).required(),
  authorId: Joi.string().required(),
  author: Joi.link('#User')
}).unknown(true).id('Post')

export const userInput = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  age: Joi.number().optional(),
  role: Joi.string().valid('USER', 'ADMIN').default('USER').required()
  // posts: Joi.array().items(Joi.link('#Post')).default([])
}).unknown(false).id('User').shared(postInput)

export const user = userInput.concat(Joi.object({
  createdAt: Joi.date().default(new Date()).required(),
  updatedAt: Joi.date().required()
}).unknown(false))

const convertJoiToOpenAPISpec = (joiSchema) => {
  const openApiSpec = {
    type: 'object',
    properties: {},
    required: []
  }

  const schemaDescription = joiSchema.describe()

  openApiSpec.additionalProperties = Boolean(schemaDescription.flags?.unknown)

  // if (schemaDescription.flags && schemaDescription.flags.presence === 'required') {
  //   openApiSpec.required.push(schemaDescription.key)
  // }

  Object.entries(schemaDescription.keys).forEach(([key, value]) => {
    openApiSpec.properties[key] = convertJoiToOpenAPIProperty(value)

    if (value.flags?.presence === 'required') {
      openApiSpec.required.push(key)
    }
  })

  return openApiSpec
}

const convertJoiToOpenAPIProperty = (joiProperty) => {
  const openApiProperty = {}

  if (joiProperty.type === 'object') {
    openApiProperty.$ref = `#/components/schemas/${joiProperty.flags.id}`
  } else if (joiProperty.type === 'array') {
    openApiProperty.type = 'array'
    openApiProperty.items = convertJoiToOpenAPIProperty(joiProperty.items[0])
  } else if (joiProperty.type === 'link') {
    openApiProperty.$ref = `#/components/schemas/${joiProperty.link.ref.path[0]}`
  } else {
    openApiProperty.type = joiProperty.type

    if (joiProperty.valids && joiProperty.valids.has(null)) {
      openApiProperty.nullable = true
    }

    if (joiProperty.valids && joiProperty.valids.size > 0) {
      openApiProperty.enum = Array.from(joiProperty.valids)
    }
  }

  if (joiProperty.allow) {
    openApiProperty.enum = joiProperty.allow
  }

  if (joiProperty.flags && Object.keys(joiProperty.flags).includes('default')) {
    openApiProperty.default = joiProperty.flags.default
  }

  return openApiProperty
}

const postInputOpenAPISpec = convertJoiToOpenAPISpec(postInput)
const userInputOpenAPISpec = convertJoiToOpenAPISpec(userInput)

const openApiSpec = {
  components: {
    schemas: {
      Post: postInputOpenAPISpec,
      User: userInputOpenAPISpec
    }
  }
}

// Printing the generated OpenAPI spec
console.log(JSON.stringify(openApiSpec, null, 2))
console.log(JSON.stringify(postInputOpenAPISpec, null, 2))
console.log(JSON.stringify(userInputOpenAPISpec, null, 2))
// console.log(joiToSwagger(postInput).swagger)
console.log(JSON.stringify(joiToSwagger(userInput).swagger, null, 2))

// console.log(userInput.validate({
//   firstname: 'John',
//   lastname: 'Doe',
//   password: '12345678',
//   email: 'john.doe@email.com',
//   posts: [{
//     title: 'First Post'
//   }]
// }))

// // import { PrismaClient } from '@prisma/client'
// import { Prisma } from '@prisma/client'
// import Joi from 'joi'

// // const prisma = new PrismaClient()

// async function generateJoiValidations () {
//   // const dmmf = await prisma.$dmmf

//   // Generate Joi validations for each model
//   const validations = {}

//   // for (const model of dmmf.datamodel.models) {
//   for (const model of Prisma.dmmf.datamodel.models) {
//     const modelValidations = {}

//     for (const field of model.fields) {
//       const fieldType = getJoiFieldType(field)
//       modelValidations[field.name] = fieldType.required()
//     }

//     validations[model.name] = Joi.object(modelValidations)
//   }

//   return validations
// }

// // Get the appropriate Joi field type based on the Prisma field type
// function getJoiFieldType (field) {
//   const scalarTypeMapping = {
//     String: Joi.string(),
//     Int: Joi.number().integer(),
//     Float: Joi.number(),
//     Boolean: Joi.boolean(),
//     DateTime: Joi.date().iso()
//   }

//   if (field.type in scalarTypeMapping) {
//     return scalarTypeMapping[field.type]
//   }

//   // Handle nested relation fields
//   if (field.relationName) {
//     const relatedModel = field.relationToFields[0].type
//     return Joi.any().valid(Joi.ref(relatedModel))
//   }

//   // Return generic Joi type if no match found
//   return Joi.any()
// }

// // Usage example
// generateJoiValidations()
//   .then((validations) => {
//     console.log(validations)
//   })
//   .catch((error) => {
//     console.error('Error generating Joi validations:', error)
//   })
