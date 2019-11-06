import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import {withRouter} from 'react-router-dom'
import {graphql} from 'react-apollo'
import GET_USER_PROFILE from '@/graphql/queries/userProfile'
import LoginPage from './LoginPage'

function redirectAuthenticatedUser() {
  const {user, history, location} = this.props
  let returnTo = (location.state && location.state.returnTo) || '/'
  if (returnTo == history.location.pathname) returnTo = '/'
  if (user) history.push(returnTo)
}

export default compose(
  withRouter,
  graphql(GET_USER_PROFILE, {
    props: ({data}) => ({
      user: data.userProfile
    }),
    options: {
      errorPolicy: 'ignore',
      fetchPolicy: 'cache-and-network'
    }
  }),
  lifecycle({
    componentDidUpdate: redirectAuthenticatedUser,
    componentDidMount: redirectAuthenticatedUser,
    UNSAFE_componentWillMount: !process.browser
      ? redirectAuthenticatedUser
      : undefined
  })
)(LoginPage)
