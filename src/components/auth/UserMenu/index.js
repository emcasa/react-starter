import {graphql} from 'react-apollo'
import GET_USER_PROFILE from '@/graphql/queries/userProfile'
import UserMenu from './UserMenu'

export default graphql(GET_USER_PROFILE, {
  fetchPolicy: 'cache-first',
  props: ({data}) => ({
    user: data.userProfile
  })
})(UserMenu)
