/**
 * Service worker entry point
 */
import {
  precache,
  precacheAndRoute,
  cleanupOutdatedCaches
} from 'workbox-precaching'
import {skipWaiting, clientsClaim} from 'workbox-core'
import * as navigationPreload from 'workbox-navigation-preload'
import {registerRoute, NavigationRoute} from 'workbox-routing'
import {CacheFirst, NetworkFirst, NetworkOnly} from 'workbox-strategies'
import rewritePlugin from './plugins/rewriteCacheKey'

/**
 * Set up
 */

skipWaiting()
clientsClaim()
cleanupOutdatedCaches()
navigationPreload.enable()

precache(['offline.html'])
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
  plugins: [rewritePlugin(/\/index\.html$/, 'offline.html')]
})
const offlineFallbackHandler = offlineFallback.handle.bind(offlineFallback)

registerRoute(new NavigationRoute(offlineFallbackHandler))

// Development stuff
if (process.env.NODE_ENV === 'development') {
  registerRoute(/(__webpack_hmr|hot-update)/, new NetworkOnly())
}
