import {ConnectedRouter} from 'connected-react-router'
import {createBrowserHistory} from 'history'
import ReactDOM from 'react-dom'
import initApollo from '@/graphql/client'
import createStore from '@/redux/store'
import Context from '@/pages/context'
import Routes from '@/pages/routes'

const root = document.getElementById('root')
const history = createBrowserHistory({})
let apolloClient = initApollo({
  getToken: () => null
})
let store = createStore({apolloClient, history}, window.__initialState)

const App = () => (
  <Context store={store} apolloClient={apolloClient}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Context>
)
ReactDOM.hydrate(<App />, root)

if (module.hot) {
  module.hot.accept('../redux/store.js', () => {
    store = require('../redux/store').default(
      {apolloClient, history},
      window.__initialState
    )
    ReactDOM.render(<App />, root)
  })
  module.hot.accept('../graphql/client', () => {
    apolloClient = require('../graphql/client').default({
      getToken: () => null
    })
    ReactDOM.render(<App />, root)
  })
  module.hot.accept(() => ReactDOM.render(<App />, root))
}
