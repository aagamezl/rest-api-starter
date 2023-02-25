import { StatusCodes } from 'http-status-codes'

import * as model from './users.model.js'
import { baseController, getError, logger } from '../../utils/index.js'

const login = async (req, res) => {
  try {
    const { token, username, email } = await model.login(req.body)

    return res.json({ token: token, username: username, email: email })
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
