import { StatusCodes } from 'http-status-codes'

import { model } from './users.model.js'
import {
  CONTENT_TYPE,
  baseController,
  errorHandler,
  getError
} from '../../utils/index.js'

const login = async (req, res) => {
  try {
    const user = await model.login(req.body)

    if (!user) {
      return res.set('Content-Type', CONTENT_TYPE).status(StatusCodes.NOT_FOUND).end()
    }

    const { token, username, email } = user

    return res.set('Content-Type', CONTENT_TYPE).json({ token, username, email })
  } catch (error) {
    errorHandler.handle(error)

    const returnError = getError(error)

    res.set('Content-Type', CONTENT_TYPE).status(returnError.status).json(returnError)
  }
}

const logout = async (req, res) => {
  try {
    await model.logout(req.headers.authorization)

    res.sendStatus(StatusCodes.NO_CONTENT)
  } catch (error) {
    errorHandler.handle(error)

    const returnError = getError(error)

    res.set('Content-Type', CONTENT_TYPE).status(returnError.status).json(returnError)
  }
}

export const controller = baseController(model, { login, logout })
