import { userCreate } from './user-create.js'
import { userDelete } from './user-delete.js'
import { userGetAll } from './user-get-all.js'
import { userGetOne } from './user-get-one.js'
import { userLogin } from './user-login.js'
import { userLogout } from './user-logout.js'
import { userUpdate } from './user-update.js'

export const userOperations = {
  paths: {
    '/users': {
      ...userGetAll,
      ...userCreate
    },
    '/users/{id}': {
      ...userGetOne,
      ...userUpdate,
      ...userDelete
    },
    '/users/login': {
      ...userLogin
    },
    '/users/logout': {
      ...userLogout
    }
  }
}
