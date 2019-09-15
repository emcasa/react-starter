import {onError} from 'apollo-link-error'

/* eslint-disable no-console */
export default () =>
  onError((data) => {
    console.error('GraphQLError:', {
      errors: data.graphQLErrors,
      networkError: data.networkError
    })
  })
/* eslint-enable */
