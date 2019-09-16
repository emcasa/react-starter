import {Helmet} from 'react-helmet'
import Shell from '@/components/layout/Shell'
import Header from '@/components/layout/Header'
import Body from '@/components/layout/Body'

export default function HomePage() {
  return (
    <Shell>
      <Helmet>
        <title>React Starter</title>
      </Helmet>
      <Header />
      <Body>home</Body>
    </Shell>
  )
}
