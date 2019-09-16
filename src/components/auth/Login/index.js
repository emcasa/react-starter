import {connect} from 'react-redux'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import {
  initAccountKit,
  emailLogin,
  smsLogin
} from '@/redux/modules/auth/actions'
import Login from './Login'

export default compose(
  connect(
    null,
    {
      initAccountKit,
      onEmailLogin: () => emailLogin({}),
      onSmsLogin: () => smsLogin({})
    }
  ),
  lifecycle({
    componentDidMount() {
      this.props.initAccountKit()
    }
  })
)(Login)
