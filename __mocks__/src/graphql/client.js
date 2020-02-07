import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import MockSchemaLink from './MockSchemaLink'

export default () => {
  const schema = new MockSchemaLink()
  const client = new ApolloClient({
    ssrMode: true,
    link: schema,
    cache: new InMemoryCache()
  })
  client.schema = schema
  return client
}
