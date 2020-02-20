const {registerRoute} = workbox.routing
const {CacheFirst} = workbox.strategies
const {CacheableResponsePlugin} = workbox.cacheableResponse
const {ExpirationPlugin} = workbox.expiration

// Cache both same-origin and cross-origin requests
const cacheAll = new CacheableResponsePlugin({statuses: [0, 200]})

registerRoute(
  /^http.*\.(woff2?|ttf|otf|eot)$/,
  new CacheFirst({
    cacheName: 'fonts',
    plugins: [cacheAll, new ExpirationPlugin({maxEntries: 10})]
  })
)

registerRoute(
  /^http.*\.(gif|png|jpg)$/,
  new CacheFirst({
    cacheName: 'images',
    plugins: [cacheAll, new ExpirationPlugin({maxEntries: 20})]
  })
)
