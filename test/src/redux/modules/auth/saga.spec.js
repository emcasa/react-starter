import {call} from 'redux-saga/effects'
import sagaTestFactory from 'redux-saga-test-factory'
import {TYPES} from '@emcasa/login/lib/sagas/actions'
import * as JWT from '@/lib/jwt'
import * as sagas from '@/redux/modules/auth/saga'

describe('@redux/modules/auth/saga', () => {
  const apolloClient = {
    resetStore: () => null,
    query: () => null,
    mutate: () => null
  }
  const sagaTest = sagaTestFactory({context: {apolloClient}})

  sagaTest(sagas.logout).do((it) => {
    it('clears token cookie', (effect) => {
      effect.should.deep.equal(call(JWT.reset))
    })

    it('resets apollo store', (effect) => {
      effect.should.deep.equal(call([apolloClient, apolloClient.resetStore]))
    })
  })

  sagaTest(sagas.login).do((it) => {
    const isTakeAny = (action) => (effect) =>
      effect.type === 'FORK' && effect.payload.args[0] === action

    it.forks(
      'fork EM_CASA_SUBMIT_TOKEN',
      isTakeAny(TYPES.EM_CASA_SUBMIT_TOKEN),
      (it) => {
        const jwt = 'test_jwt'
        const user = {id: 123}

        /**
         *  Progress @emcasa/login's saga
         */

        it('takes an EM_CASA_SUBMIT_TOKEN', () => ({
          type: TYPES.EM_CASA_SUBMIT_TOKEN,
          token: 'test_token',
          promiseDispatcher: {resolve: jest.fn(), reject: jest.fn()}
        }))

        it.forks('forks to @emcasa/login`s submitToken saga', () => true)

        it('submits api token', ({payload}) => {
          payload.fn.should.equal(apolloClient.mutate)
          return {
            data: {signInVerifyAuthenticationCode: {jwt, user}}
          }
        })

        /**
         *  Actually test loginSuccess saga
         */

        it.forks(call(sagas.loginSuccess, jwt, user))

        it('persists jwt', (effect) => {
          effect.should.deep.equal(call(JWT.persist, jwt))
        })

        it('resets the graphql store', (effect) => {
          effect.should.deep.equal(
            call([apolloClient, apolloClient.resetStore])
          )
        })
      }
    )
  })
})
