import {graphql} from 'react-apollo'
import GET_USER_PROFILE from '@/graphql/queries/userProfile'
import {emitGraphQLErrors} from '@/lib/httpStatus'

/**
 * HOC to emit 401 error when the user is not logged in
 * which causes the application to redirect to `/login`
 */
export default graphql(GET_USER_PROFILE, {
  options: {
    onError: emitGraphQLErrors,
    fetchPolicy: 'cache-and-network'
  }
})