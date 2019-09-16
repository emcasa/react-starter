import {ApolloClient} from 'apollo-client'
import {InMemoryCache, defaultDataIdFromObject} from 'apollo-cache-inmemory'
import createLink from './link'

let apolloClient = null

function createApolloClient(options, initialState) {
  const cache = new InMemoryCache({
    dataIdFromObject: (data) =>
      data.uuid ? data.uuid : defaultDataIdFromObject(data)
  }).restore(initialState || {})

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: createLink(options),
    cache
  })
}

export default function initApollo(options, initialState = {}) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) return createApolloClient(options, initialState)
  else if (!apolloClient)
    apolloClient = createApolloClient(options, initialState)
  return apolloClient
}
