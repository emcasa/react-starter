import {ApolloClient} from 'apollo-client'
import {InMemoryCache, defaultDataIdFromObject} from 'apollo-cache-inmemory'
import MockSchemaLink from './MockSchemaLink'

export let schema

export default (options, state) => {
  schema = new MockSchemaLink(options)
  const cache = new InMemoryCache({
    dataIdFromObject: (data) =>
      data.uuid ? data.uuid : defaultDataIdFromObject(data)
  })
  if (state) cache.restore(state)
  const client = new ApolloClient({
    ssrMode: true,
    link: schema,
    cache
  })
  client.schema = schema
  return client
}
