/**
 * Service worker entry point
 */
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js'
)

workbox.setConfig({debug: self.__WB_DEBUG})
workbox.core.setCacheNameDetails({
  prefix: 'wb',
  suffix: 'v1',
  precache: 'precache',
  runtime: 'runtime'
})

const {precache, precacheAndRoute, cleanupOutdatedCaches} = workbox.precaching
const {skipWaiting, clientsClaim} = workbox.core

skipWaiting()
clientsClaim()

precache([{url: '/index.html', revision: self.__WB_REVISION}])
precacheAndRoute(self.__WB_MANIFEST || [])
cleanupOutdatedCaches()

require('./routes/assets')
require('./routes/navigation')
