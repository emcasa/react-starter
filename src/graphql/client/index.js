import {ApolloClient} from 'apollo-client'
import {CachePersistor} from 'apollo-cache-persist'
import {InMemoryCache, defaultDataIdFromObject} from 'apollo-cache-inmemory'
import {getToken} from '@/lib/jwt'
import initialState from '../resolvers/initialState'
import resolvers from '../resolvers'
import createLink from './link'

let apolloClient = null

const SCHEMA_VERSION = '1'

const def = (options) => ({
  getToken,
  ...options
})

async function persistCache(cache, state) {
  if (state) cache.restore(state)
  else cache.writeData({data: initialState})

  if (!process.browser) return

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
}

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

export default function initApollo(options, state) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) return createApolloClient(options, state)
  else if (!apolloClient) apolloClient = createApolloClient(options, state)
  return apolloClient
}
