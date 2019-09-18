import express from 'express'

import apolloClientMiddleware from './middleware/apolloClient'
import clientRoute from './controllers/client'
import errorHandler from './controllers/error'

const app = express()

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR))
app.use(apolloClientMiddleware())
app.get('/*', clientRoute)
app.use(errorHandler)

export default app
