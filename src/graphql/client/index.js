import {ApolloClient} from 'apollo-client'
import {getToken} from '@/lib/jwt'
import resolvers from '../resolvers'
import initialState from '../resolvers/initialState'
import createLink from './link'
import createCache from './cache'

let apolloClient = null

function createApolloClient(options, state) {
  const cache = createCache(state)
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
