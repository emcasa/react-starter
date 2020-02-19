import {ApolloClient} from 'apollo-client'
import {CachePersistor} from 'apollo-cache-persist'
import {InMemoryCache, defaultDataIdFromObject} from 'apollo-cache-inmemory'
import {getToken} from '@/lib/jwt'
import initialState from '../resolvers/initialState'
import resolvers from '../resolvers'
import createLink from './link'

let apolloClient = null

// Bump this whenever client-side schema or fields on a query changes
const SCHEMA_VERSION = '1'

async function persistCache(cache, state) {
  if (!process.browser) {
    cache.writeData({data: initialState})
    return
  }

  const persistor = new CachePersistor({
    cache,
    storage: window.localStorage,
    debug: process.env.NODE_ENV === 'development'
  })

  const currentVersion = window.localStorage.getItem('__VERSION__')

  if (currentVersion === SCHEMA_VERSION) await persistor.restore()
  else {
    await persistor.purge()
    window.localStorage.setItem('__VERSION__', SCHEMA_VERSION)
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

function createApolloClient(options, state) {
  const cache = new InMemoryCache({
    dataIdFromObject: (data) =>
      data.uuid ? data.uuid : defaultDataIdFromObject(data)
  })
  persistCache(cache, state)
  const client = new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: createLink(def(options)),
    resolvers,
    cache
  })
  client.onResetStore(() => cache.writeData({data: initialState}))
  return client
}

const def = (options) => ({
  getToken,
  ...options
})

export default function initApollo(options, state) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) return createApolloClient(options, state)
  else if (!apolloClient) apolloClient = createApolloClient(options, state)
  return apolloClient
}
