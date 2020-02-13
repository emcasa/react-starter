import {ConnectedRouter} from 'connected-react-router'
import Context from '@/pages/context'
import Routes from '@/pages/routes'

export default function App({store, apolloClient, history}) {
  return (
    <Context store={store} apolloClient={apolloClient}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Context>
  )
}
