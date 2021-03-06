const {getCacheKeyForURL} = workbox.precaching

/**
 * Rewrite key to read from cache
 */
export default (from, to) => ({
  cacheKeyWillBeUsed({request, mode}) {
    if (mode !== 'read' || !from.test(request.url)) return request
    return new Request(getCacheKeyForURL(to) || to)
  }
})
