import Login from '@/components/auth/Login'
import ContextProvider from '@test/helpers/context'

export default {
  parameters: {fileName: __filename},
  title: 'auth/Login'
}

export const login = () => (
  <ContextProvider>
    <Login />
  </ContextProvider>
)
login.story = {name: 'default'}
