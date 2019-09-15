import {ConnectedRouter} from 'connected-react-router'
import {createBrowserHistory} from 'history'
import {hydrate} from 'react-dom'
import initApollo from '@/graphql/client'
import createStore from '@/redux/store'
import Context from '@/pages/context'
import Routes from '@/pages/routes'

const history = createBrowserHistory({})
const apolloClient = initApollo({
  getToken: () => null
})
const store = createStore({apolloClient, history}, window.__initialState)

hydrate(
  <Context store={store} apolloClient={apolloClient}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Context>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
