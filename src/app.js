import buildApp from './utils/buildApp.js'

import usersRoutes from './domains/users/users.routes.js'

const app = buildApp()

app.register(usersRoutes)

export default app
