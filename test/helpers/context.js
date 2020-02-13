import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import {withPropsOnChange} from 'recompose'
import createApolloClient from '@/graphql/client'
import createStore from '@/redux/store'
import MainContextProvider from '@/pages/context'

export {createApolloClient, createStore}

export const createHistory = (location) =>
  createMemoryHistory({
    initialEntries: [location || {pathname: '/'}],
    initialIndex: 0
  })

function ContextProvider({children, history, store, apolloClient}) {
  return (
    <MainContextProvider store={store} apolloClient={apolloClient}>
      <Router history={history}>{children}</Router>
    </MainContextProvider>
  )
}

export function defContext(props) {
  const ctx = {history: props.history || createHistory(props.location)}
  const apolloClient = props.apolloClient || createApolloClient()
  const store = ctx.store || createStore(ctx)
  return Object.assign(ctx, {apolloClient, store})
}

export default withPropsOnChange(
  ['history', 'store', 'apolloClient'],
  defContext
)(ContextProvider)
