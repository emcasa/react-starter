import {Helmet} from 'react-helmet'
import Shell from '@/components/layout/Shell'
import Header from '@/components/layout/Header'
import Body from '@/components/layout/Body'

export default function LoginPage() {
  return (
    <Shell>
      <Helmet>
        <title>React Starter - Login</title>
      </Helmet>
      <Header />
      <Body>login</Body>
    </Shell>
  )
}
