import { StatusCodes } from 'http-status-codes'

import { model } from './users.model.js'
import {
  CONTENT_TYPE,
  baseController,
  getError,
  logger
} from '../../utils/index.js'

const login = async (req, res) => {
  try {
    const user = await model.login(req.body)

    if (!user) {
      return res.sendStatus(StatusCodes.NOT_FOUND)
    }

    const { token, username, email } = user

    return res.set('Content-Type', CONTENT_TYPE).json({ token, username, email })
  } catch (error) {
    logger.error(error)

    const returnError = getError(error)

    res.status(returnError.status).json(returnError)
  }
}

const logout = async (req, res) => {
  try {
    await model.logout(req.headers.authorization)

    res.send(StatusCodes.NO_CONTENT)
  } catch (error) {
    logger.error(error)

    const returnError = getError(error)

    res.status(returnError.status).json(returnError)
  }
}

export const controller = baseController(model, { login, logout })
