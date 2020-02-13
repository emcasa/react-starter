import {Router} from 'react-router-dom'
import Context from '@/pages/context'
import Routes from '@/pages/routes'

export default function SSRApp({store, apolloClient, history}) {
  return (
    <Context store={store} apolloClient={apolloClient}>
      <Router history={history}>
        <Routes />
      </Router>
    </Context>
  )
}
