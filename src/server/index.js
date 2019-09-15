import http from 'http'

let app = require('./server').default

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
      server.on('request', nextApp)
      app = nextApp
    } catch (error) {
      console.error(error)
    }
  })
}
