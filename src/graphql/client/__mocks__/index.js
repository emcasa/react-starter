import {ApolloClient} from 'apollo-client'
import {InMemoryCache, defaultDataIdFromObject} from 'apollo-cache-inmemory'
import resolvers from '@/graphql/resolvers'
import initialState from '@/graphql/resolvers/initialState'
import MockSchemaLink from './MockSchemaLink'

export let schema

export default (options, state) => {
  schema = new MockSchemaLink(options)
  const cache = new InMemoryCache({
    dataIdFromObject: (data) =>
      data.uuid ? data.uuid : defaultDataIdFromObject(data)
  })
  if (state) cache.restore(state)
<<<<<<< HEAD
  else cache.writeData({data: initialState})
=======
>>>>>>> mockable apollo client
  const client = new ApolloClient({
    ssrMode: true,
    link: schema,
    resolvers,
    cache
  })
  client.schema = schema
  return client
}
