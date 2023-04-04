import { PrismaClient } from '@prisma/client'

export const createPrismaStub = (modelName) => {
  const dbInstance = new PrismaClient()

  const model = dbInstance[modelName]

  const stub = Object.keys((Object.assign({}, model))).reduce((result, key) => {
    if (typeof model[key] === 'function') {
      result[key] = () => {}
    } else {
      result[key] = model[key]
    }

    return result
  }, {})

  return {
    $connect: () => {},
    $disconnect: () => {},
    $transaction: () => {},
    [modelName]: stub
  }
}
