import {connect} from 'react-redux'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import Login from './Login'
import {initAccountKit, emailLogin, smsLogin} from '../actions'

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
