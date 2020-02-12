import {ApolloLink} from 'apollo-link'
import {SchemaLink} from 'apollo-link-schema'
import merge from 'merge-deep'
import {createSchema} from '@emcasa/mock-server/lib/graphql'

const mocks = {
  RootQueryType: () => ({
    userProfile: () => null
  })
}

/**
 * Mockable schema link backed by `graphql-tools` with
 * schema from `@emcasa/mock-server`.
 */
export default class MockSchemaLink extends ApolloLink {
  constructor(options) {
    super()
    this.mock(options)
  }

  /**
   * Reset GraphQL mocks.
   *
   * @param {Object} options
   * @param {Object} options.resolvers graphql-tools resolver object
   * @param {Object} options.resolvers graphql-tools mocks object
   * @see https://www.apollographql.com/docs/apollo-server/api/graphql-tools/#makeexecutableschemaoptions
   * @see https://www.apollographql.com/docs/graphql-tools/mocking/#mocking-interfaces
   */
  mock(options) {
    const schema = createSchema(merge(options, {mocks}))
    const link = new SchemaLink({schema})
    this.request = link.request.bind(link)
  }
}
