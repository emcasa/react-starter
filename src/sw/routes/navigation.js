import rewritePlugin from '../plugins/rewriteCacheKey'

const navigationPreload = workbox.navigationPreload
const {registerRoute, NavigationRoute} = workbox.routing
const {StaleWhileRevalidate} = workbox.strategies
const {BroadcastUpdatePlugin} = workbox.broadcastUpdate

// Serve cached `/index.html` as a fallback for navigation requests
const offlineFallback = new StaleWhileRevalidate({
  cacheName: 'wb-precache-v1',
  plugins: [
    rewritePlugin(/.*/, '/index.html'),
    new BroadcastUpdatePlugin(),
    {isResponseCacheable: () => false}
  ]
})

registerRoute(new NavigationRoute(offlineFallback))

navigationPreload.enable()
