import {graphql} from 'react-apollo'
import GET_USER_PROFILE from '@/graphql/queries/userProfile'
import PrivateRoute from './PrivateRoute'

export default graphql(GET_USER_PROFILE, {
  props: ({data}) => ({
    user: data.userProfile
  })
})(PrivateRoute)
