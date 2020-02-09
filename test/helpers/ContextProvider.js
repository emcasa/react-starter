jest.mock('@/graphql/client')
jest.mock('@/redux/store')

import createApolloClient from '@/graphql/client'
import createReduxStore from '@/redux/store'
import MainContextProvider from '@/pages/context'

export const context = {}
export const apolloClient = createApolloClient(context)
export const store = createReduxStore(context)

context.apolloClient = apolloClient
context.store = store

export default function ContextProvider({
  children,
  store = store,
  apolloClient = apolloClient
}) {
  return (
    <MainContextProvider store={store} apolloClient={apolloClient}>
      {children}
    </MainContextProvider>
  )
}
