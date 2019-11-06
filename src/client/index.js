import {createBrowserHistory} from 'history'
import ReactDOM from 'react-dom'
import {getToken} from '@/lib/jwt'
import initApollo from '@/graphql/client'
import createStore from '@/redux/store'
import App from './App'

const root = document.getElementById('root')
const history = createBrowserHistory({})
let apolloClient = initApollo({getToken}, window.__initialState.apollo)
let store = createStore({apolloClient, history}, window.__initialState.redux)

const AppWithContext = () => (
  <App store={store} apolloClient={apolloClient} history={history} />
)

ReactDOM.hydrate(<AppWithContext />, root)

if (module.hot) {
  module.hot.accept('../redux/store.js', () => {
    store = require('../redux/store').default(
      {apolloClient, history},
      window.__initialState
    )
    ReactDOM.render(<AppWithContext />, root)
  })
  module.hot.accept('../graphql/client', () => {
    apolloClient = require('../graphql/client').default({getToken})
    ReactDOM.render(<AppWithContext />, root)
  })
  module.hot.accept(() => ReactDOM.render(<App />, root))
}
