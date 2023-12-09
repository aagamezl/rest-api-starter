import buildApp from './utils/buildApp.js'

import postsRoutes from './domains/posts/posts.routes.js'
import usersRoutes from './domains/users/users.routes.js'

const app = buildApp()

app.register(postsRoutes)
app.register(usersRoutes)

export default app
