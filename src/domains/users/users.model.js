import { baseModel, create, getAll } from '../../utils/domains/base.model.js'

import { users } from './users.schema.js'

// const model = baseModel(users, {})
const model = baseModel(users, { create, getAll })

export default model
