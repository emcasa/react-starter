import {
  all,
  call,
  takeLatest,
  takeLeading,
  getContext
} from 'redux-saga/effects'
import ACCOUNT_KIT_SIGN_IN from '@/graphql/mutations/accountKitSignIn'
import * as AccountKit from './lib/accountKit'
import * as JWT from './lib/jwt'
import * as actions from './actions'

function* handleLogin(accessToken) {
  const client = yield getContext('apolloClient')
  const {
    data: {accountKitSignIn: data}
  } = yield call([client, client.mutate], {
    mutation: ACCOUNT_KIT_SIGN_IN,
    variables: {accessToken},
    errorPolicy: 'ignore'
  })
  if (data && data.jwt) {
    JWT.persist(data.jwt)
    client.resetStore()
  }
}

function* logout() {
  JWT.reset()
  console.log(JWT.getToken())
  const client = yield getContext('apolloClient')
  client.resetStore()
}

function* emailLogin({email}) {
  const accessToken = yield call(AccountKit.login, 'EMAIL', {
    emailAddress: email
  })
  if (accessToken) yield call(handleLogin, accessToken)
}

function* smsLogin({countryCode, phone}) {
  const accessToken = yield call(AccountKit.login, 'PHONE', {
    countryCode,
    phoneNumber: phone
  })
  if (accessToken) yield call(handleLogin, accessToken)
}

export default function* loginPageSaga() {
  yield all([
    takeLeading(actions.INIT, AccountKit.init),
    takeLatest(actions.EMAIL_LOGIN, emailLogin),
    takeLatest(actions.SMS_LOGIN, smsLogin),
    takeLatest(actions.LOGOUT, logout)
  ])
}
