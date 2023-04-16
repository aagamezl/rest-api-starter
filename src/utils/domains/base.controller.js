import { StatusCodes } from 'http-status-codes'

import { errorHandler, requestParser } from '../index.js'
import { getError } from './getError.js'

export const CONTENT_TYPE = 'application/vnd.api+json; charset=utf-8'

/**
 * BaseController
 *
 * @typedef BaseController
 * @type {object}
 * @property {(req: Request, res: Response) => void} create
 * @property {(req: Request, res: Response) => void} deleteById
 * @property {(req: Request, res: Response) => void} getAll
 * @property {(req: Request, res: Response) => void} getById
 * @property {(req: Request, res: Response) => void} update
 */

/**
 * @param {import('./base.model.js').Model} model
 * @param {Object.<string, Function>} methods
 * @returns {BaseController}
 */
export const baseController = (model, methods = {}) => {
  const create = async (req, res) => {
    try {
      const entity = await model.create(req.body)

      res.set('Content-Type', CONTENT_TYPE).status(StatusCodes.CREATED).json(entity)
    } catch (error) {
      errorHandler.handle(error)

      const returnError = getError(error)

      res.set('Content-Type', CONTENT_TYPE).status(returnError.status).json(returnError)
    }
  }

  const deleteById = async (req, res) => {
    try {
      await model.delete({ id: req.params.id })

      res.sendStatus(StatusCodes.NO_CONTENT)
    } catch (error) {
      errorHandler.handle(error)

      const returnError = getError(error)

      res.set('Content-Type', CONTENT_TYPE).status(returnError.status).json(returnError)
    }
  }

  const getAll = async (req, res) => {
    try {
      const requestData = requestParser(req.url)
      const records = await model.getAll(requestData)

      res.set('Content-Type', CONTENT_TYPE).json(records)
    } catch (error) {
      errorHandler.handle(error)

      const returnError = getError(error)

      res.set('Content-Type', CONTENT_TYPE).status(returnError.status).json(returnError)
    }
  }

  const getById = async (req, res) => {
    try {
      const requestData = requestParser(req.url)
      const record = await model.getById(requestData)

      if (!record) {
        return res.set('Content-Type', CONTENT_TYPE).status(StatusCodes.NOT_FOUND).end()
      }

      res.set('Content-Type', CONTENT_TYPE).json(record)
    } catch (error) {
      errorHandler.handle(error)

      const returnError = getError(error)

      res.set('Content-Type', CONTENT_TYPE).status(returnError.status).json(returnError)
    }
  }

  const update = async (req, res) => {
    try {
      const record = await model.update(req.params.id, req.body)

      res.set('Content-Type', CONTENT_TYPE).json(record)
    } catch (error) {
      errorHandler.handle(error)

      const returnError = getError(error)

      res.set('Content-Type', CONTENT_TYPE).status(returnError.status).json(returnError)
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
