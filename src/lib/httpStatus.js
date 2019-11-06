export const StatusCodes = {
  401: 'Usuário não autenticado',
  403: 'Você não tem acesso a esta página',
  404: 'Esta página não existe'
}

export const isGraphQLResponseError = (error) =>
  error.graphQLErrors && error.graphQLErrors.length

/**
 * Sets an `ApolloError`'s response code to GraphQL's local `httpStatus` state
 * @param {ApolloError} error
 * @see src/graphql/client/link/errorLink.js
 */
export const emitGraphQLErrors = (error) => {
  if (isGraphQLResponseError(error)) error.graphQLErrors[0].emit()
}
