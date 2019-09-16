import {connect} from 'react-redux'
import compose from 'recompose/compose'
import {graphql} from 'react-apollo'
import GET_USER_PROFILE from '@/graphql/queries/userProfile'
import UserMenu from './UserMenu'
import {logOut} from '../actions'

export default compose(
  graphql(GET_USER_PROFILE, {
    props: ({data}) => ({
      user: data.userProfile
    })
  }),
  connect(
    null,
    {onLogOut: logOut}
  )
)(UserMenu)
