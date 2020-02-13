import express from 'express'
import path from 'path'
import morgan from 'morgan'

import reactContextMiddleware from './middleware/reactContext'
import authMiddleware from './middleware/auth'
import clientRoute from './controllers/client'
import errorHandler from './controllers/error'

export default function createApplication(options = {}) {
  const app = express()

  app.use(morgan('combined'))
  app.use(express.static(path.join(__dirname, '/public')))
  app.use(reactContextMiddleware(options))
  app.use(authMiddleware())
  app.get('/*', clientRoute)
  app.use(errorHandler)

  return app
}
