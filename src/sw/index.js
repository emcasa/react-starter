/* global workbox importScripts */
/**
 * Service worker entry point
 */
import rewritePlugin from './plugins/rewriteCacheKey'

importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn/workbox/workbox-sw.js')

workbox.setConfig({debug: false})

const {precacheAndRoute, cleanupOutdatedCaches} = workbox.precaching
const {skipWaiting, clientsClaim} = workbox.core
const navigationPreload = workbox.navigationPreload
const {registerRoute, NavigationRoute} = workbox.routing
const {CacheFirst, NetworkFirst, NetworkOnly} = workbox.strategies

/**
 * Set up
 */

skipWaiting()
clientsClaim()
cleanupOutdatedCaches()
navigationPreload.enable()

precacheAndRoute(['/index.html'])
precacheAndRoute(self.__WB_MANIFEST || [])

/**
 * Routes
 */

registerRoute(
  /^https:\/\/fonts\.(googleapis|gstatic)\.com/,
  new CacheFirst({
    cacheName: 'google-fonts'
  })
)

// Serve cached `/offline.html` as a fallback for urls ending with /
const offlineFallback = new NetworkFirst({
  plugins: [rewritePlugin(/\/(index\.html)?$/, '/index.html')]
})
const offlineFallbackHandler = offlineFallback.handle.bind(offlineFallback)

registerRoute(new NavigationRoute(offlineFallbackHandler))

// Development stuff
if (process.env.NODE_ENV === 'development') {
  registerRoute(/(__webpack_hmr|hot-update)/, new NetworkOnly())
}
