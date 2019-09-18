import {onError} from 'apollo-link-error'

const logErrors = (data) =>
  console.error('GraphQLError:', {
    errors: data.graphQLErrors,
    networkError: data.networkError
  })

const isUnauthorized = ({graphQLErrors}) =>
  graphQLErrors && graphQLErrors.find(({code}) => code == 401)

export default () =>
  onError((data) => {
    if (isUnauthorized(data)) {
      // Ignore 401 errors
      data.response.errors = null
    } else logErrors(data)
  })
