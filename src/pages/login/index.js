import {Helmet} from 'react-helmet'
import Shell from '@/components/layout/Shell'
import Header from '@/components/layout/Header'
import Body from '@/components/layout/Body'
import Login from '@/components/auth/Login'

export default function LoginPage() {
  return (
    <Shell>
      <Helmet>
        <title>React Starter - Login</title>
      </Helmet>
      <Header />
      <Body>
        <Login />
      </Body>
    </Shell>
  )
}
