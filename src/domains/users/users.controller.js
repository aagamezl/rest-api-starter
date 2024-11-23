import { baseController } from '../../common/index.js'
import { model } from './users.model.js'

export const controller = baseController(model)
