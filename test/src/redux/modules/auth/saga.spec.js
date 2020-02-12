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

  const sagaTest = sagaTestFactory({context: {apolloClient}})

  const countryCode = '+55'
  const phone = '2199999999'

  sagaTest(sagas.smsLogin, {countryCode, phone}).do((it) => {
    it('calls sms AccountKit login', ({payload}) => {
      payload.fn.should.equal(AccountKit.login)
      payload.args[0].should.equal('PHONE')
      payload.args[1].should.deep.equal({countryCode, phoneNumber: phone})
      return 'some api token'
    })

    it('calls handleLogi n saga', ({payload}) => {
      payload.fn.should.equal(sagas.handleLogin)
      payload.args[0].should.equal('some api token')
    })
  })

  const email = 'dev@emcasa.com'

  sagaTest(sagas.emailLogin, {email}).do((it) => {
    it('calls email AccountKit login', ({payload}) => {
      payload.fn.should.equal(AccountKit.login)
      payload.args[0].should.equal('EMAIL')
      payload.args[1].should.deep.equal({emailAddress: email})
      return 'some api token'
    })

    it('calls handleLogin saga', ({payload}) => {
      payload.fn.should.equal(sagas.handleLogin)
      payload.args[0].should.equal('some api token')
    })
  })

  const accessToken = 'some api token'

  sagaTest(sagas.handleLogin, accessToken).do((it) => {
    it('calls accountKitSignIn mutation', ({payload}) => {
      payload.fn.should.equal(apolloClient.mutate)
      payload.args[0].mutation.should.equal(ACCOUNT_KIT_SIGN_IN)
      payload.args[0].variables.should.deep.equal({accessToken})
    })

    it.clone('failed login', {data: {accountKitSignIn: {}}}, (it) => {
      it('terminates', (_, {done}) => done.should.equal(true))
    })

    it.clone(
      'successful login',
      {
        data: {accountKitSignIn: {jwt: 'some jwt', user: {id: 1}}}
      },
      (it) => {
        it('persists JWT', ({payload}) => {
          payload.fn.should.equal(JWT.persist)
          payload.args[0].should.equal('some jwt')
        })
        it('resets graphql cache', ({payload}) => {
          payload.fn.should.equal(apolloClient.resetStore)
        })
      }
    )
  })
})
