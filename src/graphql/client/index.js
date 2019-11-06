import {ApolloClient} from 'apollo-client'
import {InMemoryCache, defaultDataIdFromObject} from 'apollo-cache-inmemory'
import initialState from '../resolvers/initialState'
import resolvers from '../resolvers'
import createLink from './link'

let apolloClient = null

function createApolloClient(options, state) {
  const cache = new InMemoryCache({
    dataIdFromObject: (data) =>
      data.uuid ? data.uuid : defaultDataIdFromObject(data)
  })
  if (state) cache.restore(state)
  else cache.writeData({data: initialState})
  const client = new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: createLink(options),
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
