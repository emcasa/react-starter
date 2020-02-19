import {CachePersistor} from 'apollo-cache-persist'
import {InMemoryCache, defaultDataIdFromObject} from 'apollo-cache-inmemory'
import initialState from '../resolvers/initialState'

// Bump this whenever client-side schema or fields on a query changes
const SCHEMA_VERSION = '1'

export default function createCache(state) {
  const cache = new InMemoryCache({
    dataIdFromObject: (data) =>
      data.uuid ? data.uuid : defaultDataIdFromObject(data)
  })
  // Apollo client instantiation should be synchronous, so we just discard the
  // result of this promise and hope it does ok
  persistCache(cache, state)
  return cache
}

async function persistCache(cache, state) {
  if (!process.browser) {
    cache.writeData({data: initialState})
    return
  }
  const persistor = new CachePersistor({
    cache,
    storage: window.localStorage,
    key: 'APOLLO_CACHE',
    debug: process.env.NODE_ENV === 'development'
  })
  const currentVersion = window.localStorage.getItem('APOLLO_CACHE_VERSION')
  if (currentVersion === SCHEMA_VERSION) await persistor.restore()
  else {
    await persistor.purge()
    window.localStorage.setItem('APOLLO_CACHE_VERSION', SCHEMA_VERSION)
  }

  if (state) cache.restore(mergeState(cache.extract(true), state))
  else cache.writeData({data: initialState})
}

const mergeState = (a = {}, b = {}) => ({
  ...a,
  ...b,
  $ROOT_QUERY: Object.assign({}, a.$ROOT_QUERY, b.$ROOT_QUERY),
  ROOT_QUERY: Object.assign({}, a.ROOT_QUERY, b.ROOT_QUERY)
})
