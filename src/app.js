import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import { router } from './api.routes.js'

/**
 * Express instance
 * @public
 */
export const app = express()

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.use(helmet())
app.use(cors())

// mount api routes
app.use('/', router)
