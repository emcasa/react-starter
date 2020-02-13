export const StatusCodes = {
  401: 'Usuário não autenticado',
  403: 'Você não tem acesso a esta página',
  404: 'Esta página não existe'
}

export const isGraphQLResponseError = (error) =>
  error.graphQLErrors && error.graphQLErrors.length

const getGraphQLResponseError = (error) =>
  isGraphQLResponseError(error) && error.graphQLErrors[0]

const errorMatches = (matcher, error) => {
  if (!matcher) return true
  if (typeof matcher === 'function') return matcher(error)
  if (matcher.includes) return matcher.includes(error.code)
}

/**
 * Sets an `ApolloError`'s response code to GraphQL's local `httpStatus` state
 * @param {Function|Number[]} errorMatcher Array of status codes to accept or
 *                                         function that matches a graphql error
 * @param {ApolloError} error
 * @see src/graphql/client/link/errorLink.js
 */
export const emitGraphQLErrors = (errorMatcher) => (error) => {
  const graphQLError = getGraphQLResponseError(error)
  if (errorMatches(errorMatcher, graphQLError)) graphQLError.emit()
}
