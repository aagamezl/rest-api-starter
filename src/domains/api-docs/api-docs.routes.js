import express from 'express'
import swaggerUI from 'swagger-ui-express'

import { openAPI } from '../../open-api/index.js'

export const router = express.Router({
  strict: true
})

// Define OpenAPI options
const options = {
  swaggerOptions: {
    url: '/api-docs/swagger.json'
  }
}

// mount OpenAPI routes
router.get('/api-docs/swagger.json', (req, res) => res.json(openAPI))
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openAPI, options))
