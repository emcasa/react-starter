import {connect} from 'react-redux'
import compose from 'recompose/compose'
import {logout} from '@/redux/modules/auth/actions'
import UserMenu from './UserMenu'

export default compose(connect(null, {onLogout: logout}))(UserMenu)
