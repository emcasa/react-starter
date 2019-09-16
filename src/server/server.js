import express from 'express'

import apolloClientMiddleware from './middleware/apolloClient'
import clientRoute from './routes/client'

const app = express()

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR))
app.use(apolloClientMiddleware())
app.get('/*', clientRoute)

export default app
