import sagaTestFactory from 'redux-saga-test-factory'
import * as AccountKit from '@/lib/accountKit'
import * as JWT from '@/lib/jwt'
import * as sagas from '@/redux/modules/auth/saga'
import ACCOUNT_KIT_SIGN_IN from '@/graphql/mutations/accountKitSignIn'

describe('@redux/modules/auth/saga', () => {
  const apolloClient = {
    resetStore: () => null,
    query: () => null,
    mutate: () => null
  }
  const sagaTest = sagaTestFactory(
    {context: {apolloClient}},
    {it: it, before: beforeAll}
  )

  describe('smsLogin({countryCode, phone})', () => {
    const countryCode = '+55'
    const phone = '2199999999'

    const it = sagaTest(sagas.smsLogin, {countryCode, phone})

    it('calls sms AccountKit login', ({value: {payload}}) => {
      payload.fn.should.equal(AccountKit.login)
      payload.args[0].should.equal('PHONE')
      payload.args[1].should.deep.equal({countryCode, phoneNumber: phone})
      return 'some api token'
    })

    it('calls handleLogin saga', ({value: {payload}}) => {
      payload.fn.should.equal(sagas.handleLogin)
      payload.args[0].should.equal('some api token')
    })
  })

  describe('emailLogin({email})', () => {
    const email = 'dev@emcasa.com'
    const it = sagaTest(sagas.emailLogin, {email})

    it('calls email AccountKit login', ({value: {payload}}) => {
      payload.fn.should.equal(AccountKit.login)
      payload.args[0].should.equal('EMAIL')
      payload.args[1].should.deep.equal({emailAddress: email})
      return 'some api token'
    })

    it('calls handleLogin saga', ({value: {payload}}) => {
      payload.fn.should.equal(sagas.handleLogin)
      payload.args[0].should.equal('some api token')
    })
  })

  describe('handleLogin(accessToken)', () => {
    const accessToken = 'some api token'
    const handleLoginTest = sagaTest(sagas.handleLogin, accessToken)
    const it = handleLoginTest

    it('calls accountKitSignIn mutation', ({value: {payload}}) => {
      payload.fn.should.equal(apolloClient.mutate)
      payload.args[0].mutation.should.equal(ACCOUNT_KIT_SIGN_IN)
      payload.args[0].variables.should.deep.equal({accessToken})
    })

    describe('failed login', () => {
      const it = handleLoginTest.clone({data: {accountKitSignIn: {}}})

      it('terminates', ({done}) => done.should.equal(true))
    })

    describe('successful login', () => {
      const it = handleLoginTest.clone({
        data: {accountKitSignIn: {jwt: 'some jwt', user: {id: 1}}}
      })

      it('persists JWT', ({value: {payload}}) => {
        payload.fn.should.equal(JWT.persist)
        payload.args[0].should.equal('some jwt')
      })
      it('resets graphql cache', ({value: {payload}}) => {
        payload.fn.should.equal(apolloClient.resetStore)
      })
    })
  })
})
