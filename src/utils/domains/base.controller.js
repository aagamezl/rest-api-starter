import { StatusCodes } from 'http-status-codes'

import { errorHandler, queryParser } from '../index.js'
import { getError } from './getError.js'

const CONTENT_TYPE = 'application/vnd.api+json'

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
 * @param {Model} model
 * @param {object} additionalMethods
 * @returns {Controller}
 */
export const baseController = (model, methods = {}) => {
  const create = async (req, res) => {
    try {
      const entity = await model.create(req.body)

      res.set('Content-Type', CONTENT_TYPE).status(StatusCodes.CREATED).json(entity)
    } catch (error) {
      errorHandler.handle(error)

      const returnError = getError(error)

      res.status(returnError.status).json(returnError)
    }
  }

  const deleteById = async (req, res) => {
    try {
      const deleted = await model.deleteById(req.params.id)

      if (!deleted) {
        return res.sendStatus(StatusCodes.NOT_FOUND)
      }

      res.set('Content-Type', CONTENT_TYPE).sendStatus(StatusCodes.NO_CONTENT)
    } catch (error) {
      errorHandler.handle(error)

      const returnError = getError(error)

      res.status(returnError.status).json(returnError)
    }
  }

  const getAll = async (req, res) => {
    try {
      const requestData = queryParser(req.url)

      const records = await model.getAll(requestData)

      res.set('Content-Type', CONTENT_TYPE).json(records)
    } catch (error) {
      errorHandler.handle(error)

      const returnError = getError(error)

      res.status(returnError.status).json(returnError)
    }
  }

  const getById = async (req, res) => {
    try {
      const requestData = queryParser(req.url)
      const record = await model.getById(requestData)

      if (!record) {
        return res.sendStatus(StatusCodes.NOT_FOUND)
      }

      res.set('Content-Type', CONTENT_TYPE).json(record)
    } catch (error) {
      errorHandler.handle(error)

      const returnError = getError(error)

      res.status(returnError.status).json(returnError)
    }
  }

  const update = async (req, res) => {
    try {
      const grocery = await model.update(req.params.id, req.body)

      res.set('Content-Type', CONTENT_TYPE).json(grocery)
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
