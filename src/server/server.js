import express from 'express'
import path from 'path'

import apolloClientMiddleware from './middleware/apolloClient'
import clientRoute from './controllers/client'
import errorHandler from './controllers/error'

const app = express()
app.use(express.static(path.join(__dirname, '/public')))
app.use(apolloClientMiddleware())
app.get('/*', clientRoute)
app.use(errorHandler)

export default app
