import {ApolloClient} from 'apollo-client'
import {InMemoryCache, defaultDataIdFromObject} from 'apollo-cache-inmemory'
import * as ApolloLink from 'apollo-link'
import merge from 'merge-deep'
import clientResolvers from '@/graphql/resolvers'
import clientInitialState from '@/graphql/resolvers/initialState'
import errorLink from '@/graphql/client/link/errorLink'
import MockSchemaLink from './MockSchemaLink'

export let schema

export default (options = {}, state) => {
  const resolvers = merge({}, clientResolvers, options.clientResolvers)
  const initialState = merge({}, clientInitialState, options.initialState)
  schema = new MockSchemaLink(options)
  const cache = new InMemoryCache({
    dataIdFromObject: (data) =>
      data.uuid ? data.uuid : defaultDataIdFromObject(data)
  })
  if (state) cache.restore(state)
  else cache.writeData({data: initialState})
  const client = new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([errorLink(), schema]),
    resolvers,
    cache
  })
  client.schema = schema
  client.mock = schema.mock
  return client
}
