import UserMenu from '@/components/auth/UserMenu/UserMenu'

export default {
  title: 'auth/UserMenu'
}

export const userMenu = () => <UserMenu user={{name: 'test'}} />
userMenu.story = {name: 'default'}
