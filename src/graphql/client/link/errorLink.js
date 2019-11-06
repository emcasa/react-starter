import {onError} from 'apollo-link-error'
import {setHttpStatus} from '@/graphql/resolvers/Mutation'
import {StatusCodes} from '@/lib/httpStatus'

const logErrors = (data) =>
  console.error('GraphQLError:', {
    errors: data.graphQLErrors,
    networkError: data.networkError
  })

const enhanceGraphQLError = (context) => (error) => ({
  ...error,
  /**
   * Update httpStatus state to this error's response
   */
  emit: () => {
    const code = error.code || 500
    const message = StatusCodes[code] || error.message
    setHttpStatus({}, {code, message}, context)
  }
})

export default () =>
  onError((data) => {
    const context = data.operation.getContext()
    if (process.browser) logErrors(data)
    if (data.response && data.response.errors)
      data.response.errors = data.response.errors.map(
        enhanceGraphQLError(context)
      )
  })
