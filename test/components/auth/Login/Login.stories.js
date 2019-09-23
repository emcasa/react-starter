import {action} from '@storybook/addon-actions'
import Login from '@/components/auth/Login/Login'

export default {
  title: 'auth/Login'
}

export const login = () => (
  <Login
    onSmsLogin={action('sms login')}
    onEmailLogin={action('email login')}
  />
)
login.story = {name: 'default'}
