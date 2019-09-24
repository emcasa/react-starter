import {action} from '@storybook/addon-actions'
import UserMenu from '@/components/auth/UserMenu/UserMenu'

export default {
  title: 'auth/UserMenu'
}

export const userMenu = () => (
  <UserMenu color="pink" user={{name: 'test'}} onLogOut={action('logout')} />
)
userMenu.story = {name: 'default'}
