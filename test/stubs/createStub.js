import { camelCase } from '@devnetic/utils'
import { Prisma, PrismaClient } from '@prisma/client'

export const createPrismaStub = () => {
  const dbInstance = new PrismaClient()

  const modelNames = Prisma.dmmf.datamodel.models.map(model => camelCase(model.name))

  const modelStubs = modelNames.reduce((modelStub, modelName) => {
    const model = dbInstance[modelName]

    const stubMethods = Object.keys(Object.assign({}, model)).reduce((result, key) => {
      if (typeof model[key] === 'function') {
        result[key] = () => {}
      } else {
        result[key] = model[key]
      }

      return result
    }, {})

    modelStub[modelName] = stubMethods

    return modelStub
  }, {})

  const stub = {
    $connect: () => { },
    $disconnect: () => { },
    $transaction: () => { },
    ...modelStubs
  }

  return stub
}
