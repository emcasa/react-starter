import {Helmet} from 'react-helmet'
import Shell from '@/components/layout/Shell'
import Header from '@/components/layout/Header'
import Body from '@/components/layout/Body'

export default function ProtectedPage({user}) {
  if (!user) return null
  return (
    <Shell>
      <Helmet>
        <title>React Starter</title>
      </Helmet>
      <Header />
      <Body>Hi, ${user.name || 'you'}</Body>
    </Shell>
  )
}
