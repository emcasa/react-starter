import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import MockSchemaLink from './MockSchemaLink'

export let schema

export default () => {
  schema = new MockSchemaLink()
  const client = new ApolloClient({
    ssrMode: true,
    link: schema,
    cache: new InMemoryCache()
  })
  client.schema = schema
  return client
}
