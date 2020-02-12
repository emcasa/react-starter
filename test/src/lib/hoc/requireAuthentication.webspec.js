jest.mock('@/graphql/client')
jest.mock('@/redux/store')

import {ApolloError} from 'apollo-server'
import {render} from 'react-dom'
import {act} from 'react-dom/test-utils'
import {createTestElement} from '@test/helpers/react-dom'
import Provider, {createApolloClient} from '@test/helpers/context'

import requireAuthentication from '@/lib/hoc/requireAuthentication'
import GET_HTTP_STATUS from '@/graphql/queries/httpStatus'

const TestComponent = requireAuthentication(() => null)

describe('@pages/login', () => {
  const container = createTestElement()

  context('unauthenticated user', () => {
    const apolloClient = createApolloClient({
      mocks: {
        RootQueryType: () => ({
          userProfile: () => {
            throw new ApolloError('unauthorized', 401)
          }
        })
      }
    })

    it('emits status 401', async () => {
      await act(async () => {
        render(
          <Provider apolloClient={apolloClient}>
            <TestComponent />
          </Provider>,
          container
        )
      })

      apolloClient.cache
        .readQuery({query: GET_HTTP_STATUS})
        .httpStatus.should.deep.eq({
          code: 401,
          message: 'Usuário não autenticado',
          __typename: 'HttpStatus'
        })
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

    it('emits status 200', async () => {
      await act(async () => {
        render(
          <Provider apolloClient={apolloClient}>
            <TestComponent />
          </Provider>,
          container
        )
      })

      apolloClient.cache
        .readQuery({query: GET_HTTP_STATUS})
        .httpStatus.should.deep.eq({
          code: 200,
          message: 'OK',
          __typename: 'HttpStatus'
        })
    })
  })
})
