import express from 'express'
import path from 'path'

import reactContextMiddleware from './middleware/reactContext'
import authMiddleware from './middleware/auth'
import clientRoute from './controllers/client'
import errorHandler from './controllers/error'

const app = express()
app.use(express.static(path.join(__dirname, '/public')))
app.use(reactContextMiddleware())
app.use(authMiddleware())
app.get('/*', clientRoute)
app.use(errorHandler)

export default app
