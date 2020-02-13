import {fork, all, call, getContext, takeEvery} from 'redux-saga/effects'
import createAuthSaga from '@emcasa/login/lib/sagas/authSaga'
import * as JWT from '@/lib/jwt'
import * as action from './actions'

export function* loginSuccess(jwt) {
  const client = yield getContext('apolloClient')
  yield call(JWT.persist, jwt)
  yield call([client, client.resetStore])
}

export const login = createAuthSaga({
  onSuccess: loginSuccess
})

export function* logout() {
  const client = yield getContext('apolloClient')
  yield call(JWT.reset)
  yield call([client, client.resetStore])
}

export default function* authSaga() {
  yield all([takeEvery(action.LOGOUT, logout), fork(login)])
}
