import {action} from '@storybook/addon-actions'
import UserMenu from '@/components/auth/UserMenu/UserMenu'

export default {
  parameters: {fileName: __filename},
  title: 'auth/UserMenu'
}

export const userMenu = () => (
  <UserMenu color="pink" user={{name: 'test'}} onLogout={action('logout')} />
)
userMenu.story = {name: 'default'}
