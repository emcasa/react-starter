import {call} from 'redux-saga/effects'
import sagaTestFactory from 'redux-saga-test-factory'
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

  sagaTest(sagas.loginSuccess, 'token').do((it) => {
    it('persists jwt', (effect) => {
      effect.should.deep.equal(call(JWT.persist, 'token'))
    })

    it('resets the graphql store', (effect) => {
      effect.should.deep.equal(call([apolloClient, apolloClient.resetStore]))
    })
  })
})
