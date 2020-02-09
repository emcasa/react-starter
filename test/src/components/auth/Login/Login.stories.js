import {action} from '@storybook/addon-actions'
import Login from '@/components/auth/Login'

export default {
  parameters: {fileName: __filename},
  title: 'auth/Login'
}

export const login = () => (
  <Login />
)
login.story = {name: 'default'}
