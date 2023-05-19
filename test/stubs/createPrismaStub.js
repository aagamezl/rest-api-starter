import { camelCase } from '@devnetic/utils'
import { Prisma, PrismaClient } from '@prisma/client'

/**
 * An object representing page information.
 *
 * @typedef {Object} PrismaStub
 * @property {() => Promise} $connect - The connect stub method.
 * @property {() => Promise} $disconnect - The disconnect stub method.
 * @property {() => Promise} $transaction - The transaction stub method.
*/

/**
 *
 * @returns {PrismaStub & Object.<string, unknown>}
 */
export const createPrismaStub = () => {
  const dbInstance = new PrismaClient()

  const modelNames = Prisma.dmmf.datamodel.models.map(model => camelCase(model.name))

  /** @type {Object.<string, unknown>} */
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
    $connect: () => Promise.resolve({ }),
    $disconnect: () => Promise.resolve({ }),
    $transaction: () => Promise.resolve({ }),
    ...modelStubs
  }

  return stub
}
