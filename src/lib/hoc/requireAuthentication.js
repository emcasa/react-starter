import {graphql} from 'react-apollo'
import GET_USER_PROFILE from '@/graphql/queries/userProfile'
import {emitGraphQLErrors} from '@/lib/httpStatus'

/**
 * HOC to emit 4xx errors when the user is not logged in
 * which causes the application to redirect to `/login`.
 */
export default graphql(GET_USER_PROFILE, {
  props: ({data}) => ({
    user: data.userProfile
  }),
  options: {
    onError: emitGraphQLErrors([401, 403]),
    fetchPolicy: 'cache-and-network'
  }
})
