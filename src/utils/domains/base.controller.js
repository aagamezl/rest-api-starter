import { StatusCodes } from 'http-status-codes'

import { errorHandler/* , queryParser */ } from '../index.js'
import { getError } from './getError.js'

/**
 * Base Controller
 *
 * @typedef Controller
 * @type {object}
 * @property {(req: Request, res: Response) => void} create
 * @property {(req: Request, res: Response) => void} create
 * @property {(req: Request, res: Response) => void} deleteById
 * @property {(req: Request, res: Response) => void} getAll
 * @property {(req: Request, res: Response) => void} getById
 * @property {(req: Request, res: Response) => void} update
 */

/**
 * Base Model
 *
 * @typedef Model
 * @type {object}
 *
 * @property {(payload: Payload) => Promise<AbstractBaseEntity>} create
 * @property {(id: string) => Promise<DeleteResult>} deleteById
 * @property {(requestData: RequestData) => Promise<GetAllResponse>} getAll
 * @property {(id: string, requestData: RequestData) => Promise<AbstractBaseEntity>} getById
 * @property {(id: string, payload: UpdatePayload<TEntity>) => Promise<AbstractBaseEntity>} update
 */

/**
 * @param {Model} model
 * @param {object} additionalMethods
 * @returns {Controller}
 */
export const baseController = (model, methods = {}) => {
  const create = async (req, res) => {
    try {
      const entity = await model.create(req.body)

      res.status(StatusCodes.CREATED).json(entity)
    } catch (error) {
      errorHandler.handle(error)

      const returnError = getError(error)

      res.status(returnError.status).json(returnError)
    }
  }

  const deleteById = async (req, res) => {
    try {
      const { affected } = await model.deleteById(req.params.id)

      if (affected === 0) {
        return res.sendStatus(StatusCodes.NOT_FOUND)
      }

      res.sendStatus(StatusCodes.NO_CONTENT)
    } catch (error) {
      errorHandler.handle(error)

      const returnError = getError(error)

      res.status(returnError.status).json(returnError)
    }
  }

  const getAll = async (req, res) => {
    try {
      // const requestData = queryParser(req.url)

      const result = await model.getAll(/* requestData */)

      res.json(result)
    } catch (error) {
      errorHandler.handle(error)

      const returnError = getError(error)

      res.status(returnError.status).json(returnError)
    }
  }

  const getById = async (req, res) => {
    try {
      // const requestData = queryParser(req.url)
      const grocery = await model.getById(req.params.id/* , requestData */)

      if (!grocery) {
        return res.sendStatus(StatusCodes.NOT_FOUND)
      }

      res.json(grocery)
    } catch (error) {
      errorHandler.handle(error)

      const returnError = getError(error)

      res.status(returnError.status).json(returnError)
    }
  }

  const update = async (req, res) => {
    try {
      const grocery = await model.update(req.params.id, req.body)

      res.json(grocery)
    } catch (error) {
      errorHandler.handle(error)

      const returnError = getError(error)

      res.status(returnError.status).json(returnError)
    }
  }

  return {
    create,
    deleteById,
    getAll,
    getById,
    update,
    ...methods
  }
}
