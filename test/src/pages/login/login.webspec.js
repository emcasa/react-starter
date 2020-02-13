jest.mock('@/graphql/client')
jest.mock('@/redux/store')

import {expect} from 'chai'
import {render} from 'react-dom'
import {act} from 'react-dom/test-utils'
import {createTestElement} from '@test/helpers/react-dom'
import Provider, {
  createApolloClient,
  createHistory
} from '@test/helpers/context'

import LoginPage from '@/pages/login'

describe('@pages/login', () => {
  const container = createTestElement()

  context('unauthenticated user', () => {
    const history = createHistory({pathname: '/login'})
    const apolloClient = createApolloClient()

    it('renders login page', async () => {
      await act(async () => {
        render(
          <Provider history={history} apolloClient={apolloClient}>
            <LoginPage />
          </Provider>,
          container
        )
      })
      expect(history.length).to.eq(1)
    })
  })

  context('authenticated user', () => {
    const apolloClient = createApolloClient({
      mocks: {
        RootQueryType: () => ({
          userProfile: () => ({id: 123})
        })
      }
    })

    it('redirects to the home page', async () => {
      const history = createHistory({pathname: '/login'})
      await act(async () => {
        render(
          <Provider history={history} apolloClient={apolloClient}>
            <LoginPage />
          </Provider>,
          container
        )
      })
      expect(history.length).to.eq(2)
      expect(history.location.pathname).to.eq('/')
    })

    it('redirects to the returnTo page', async () => {
      const history = createHistory({
        pathname: '/login',
        state: {returnTo: '/somewhere'}
      })
      await act(async () => {
        render(
          <Provider history={history} apolloClient={apolloClient}>
            <LoginPage />
          </Provider>,
          container
        )
      })
      expect(history.length).to.eq(2)
      expect(history.location.pathname).to.eq('/somewhere')
    })
  })
})
