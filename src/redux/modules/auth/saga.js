import {fork, all, call, getContext, takeEvery} from 'redux-saga/effects'
import createAuthSaga from '@emcasa/login/lib/sagas/authSaga'
import * as JWT from '@/lib/jwt'
import * as action from './actions'

const loginSaga = createAuthSaga({
  onSuccess: function*(jwt) {
    const client = yield getContext('apolloClient')
    yield call(JWT.persist, jwt)
    yield call([client, client.resetStore])
  }
})

function* logout() {
  yield call(JWT.reset)
}

export default function* authSaga() {
  yield all([takeEvery(action.LOGOUT, logout), fork(loginSaga)])
}
