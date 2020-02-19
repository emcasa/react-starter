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

skipWaiting()
clientsClaim()
cleanupOutdatedCaches()
navigationPreload.enable()

// Pre-cache asserts once the service worker is installed
precache(['offline.html'])
precacheAndRoute(['favicon.ico'])
precacheAndRoute(self.__WB_MANIFEST || [])

registerRoute(
  /^https:\/\/fonts\.(googleapis|gstatic)\.com/,
  new CacheFirst({
    cacheName: 'google-fonts'
  })
)

// Rewrite fallback cache key to /offline.html
const offlineFallback = new NetworkFirst({
  plugins: [rewritePlugin(/\/index\.html$/, 'offline.html')]
})
const offlineFallbackHandler = offlineFallback.handle.bind(offlineFallback)

registerRoute(new NavigationRoute(offlineFallbackHandler))

if (process.env.NODE_ENV === 'development') {
  registerRoute(/(__webpack_hmr|hot-update)/, new NetworkOnly())
}
