import { StatusCodes } from 'http-status-codes'

import * as model from './user.model'
import { createController } from './../../utils/domains/base.controller'
import { getError, logger } from './../../utils'

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

export const controller = createController(model, { login, logout })
