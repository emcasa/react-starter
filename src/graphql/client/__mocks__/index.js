import {ApolloClient} from 'apollo-client'
import {InMemoryCache, defaultDataIdFromObject} from 'apollo-cache-inmemory'
import MockSchemaLink from './MockSchemaLink'

export let schema

export default (_, initialState) => {
  schema = new MockSchemaLink()
  const cache = new InMemoryCache({
    dataIdFromObject: (data) =>
      data.uuid ? data.uuid : defaultDataIdFromObject(data)
  }).restore(initialState || {})
  const client = new ApolloClient({
    ssrMode: true,
    link: schema,
    cache
  })
  client.schema = schema
  return client
}
