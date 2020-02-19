/**
 * Express server entry point
 */
import http from 'http'
import createApp from './server'

require('dotenv').config()

let app = createApp()

const server = http.createServer(app)

const PORT = process.env.PORT || 3000

server.listen(PORT, (error) => {
  if (error) console.error(error)
  console.log(`🚀 Ready on http://localhost:${PORT}`)
})

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!')

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...')
    try {
      const nextApp = require('./server').default
      server.removeListener('request', app)
      app = nextApp()
      server.on('request', app)
    } catch (error) {
      console.error(error)
    }
  })
}
