import { StatusCodes } from 'http-status-codes'

import { errorHandler, requestParser } from '../index.js'
import { getError } from './getError.js'

export const CONTENT_TYPE = 'application/vnd.api+json; charset=utf-8'

/**
 * Base Controller
 *
 * @template M
 * @typedef {M & {
 * create: (req: import('express').Request, res: import('express').Response) => Promise.<void>
 * delete: (req: import('express').Request, res: import('express').Response) => Promise.<void>
 * getAll: (req: import('express').Request, res: import('express').Response) => Promise.<void>
 * getById: (req: import('express').Request, res: import('express').Response) => Promise.<void>
 * update: (req: import('express').Request, res: import('express').Response) => Promise.<void>
 * }} BaseController<M>
 */

/**
 * @template T, M
 * @param {import('./base.model.js').Model<T>} model
 * @param {M} [methods]
 * @returns {BaseController<M>}
 */
export const baseController = (model, methods) => {
  return {
    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {Promise.<void>}
     */
    async create (req, res) {
      try {
        const entity = await model.create(req.body)

        res.set('Content-Type', CONTENT_TYPE).status(StatusCodes.CREATED).json(entity)
      } catch (error) {
        errorHandler.handle(error)

        const returnError = getError(error)

        res.set('Content-Type', CONTENT_TYPE).status(returnError.status).json(returnError)
      }
    },

    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {Promise.<void>}
     */
    async delete (req, res) {
      try {
        await model.delete({ id: req.params.id })

        res.sendStatus(StatusCodes.NO_CONTENT)
      } catch (error) {
        errorHandler.handle(error)

        const returnError = getError(error)

        res.set('Content-Type', CONTENT_TYPE).status(returnError.status).json(returnError)
      }
    },

    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {Promise.<void>}
     */
    async getAll (req, res) {
      try {
        const requestData = requestParser(req.url)
        const records = await model.getAll(requestData)

        res.set('Content-Type', CONTENT_TYPE).json(records)
      } catch (error) {
        errorHandler.handle(error)

        const returnError = getError(error)

        res.set('Content-Type', CONTENT_TYPE).status(returnError.status).json(returnError)
      }
    },

    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {Promise.<void>}
     */
    async getById (req, res) {
      try {
        const requestData = requestParser(req.url)
        const record = await model.getById(requestData)

        if (!record) {
          res.set('Content-Type', CONTENT_TYPE).status(StatusCodes.NOT_FOUND).end()

          return
        }

        res.set('Content-Type', CONTENT_TYPE).json(record)
      } catch (error) {
        errorHandler.handle(error)

        const returnError = getError(error)

        res.set('Content-Type', CONTENT_TYPE).status(returnError.status).json(returnError)
      }
    },

    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {Promise.<void>}
     */
    async update (req, res) {
      try {
        const record = await model.update(req.params.id, req.body)

        res.set('Content-Type', CONTENT_TYPE).json(record)
      } catch (error) {
        errorHandler.handle(error)

        const returnError = getError(error)

        res.set('Content-Type', CONTENT_TYPE).status(returnError.status).json(returnError)
      }
    },
    ...methods
  }
}
