import {Helmet} from 'react-helmet'
import Shell from '@/components/layout/Shell'
import Header from '@/components/layout/Header'
import Body from '@/components/layout/Body'
import Spinner from '@/components/layout/Spinner'

export default function HomePage() {
  return (
    <Shell>
      <Helmet>
        <title>React Starter</title>
      </Helmet>
      <Header />
      <Body justifyContent="center" alignItems="center">
        <Spinner />
      </Body>
    </Shell>
  )
}
