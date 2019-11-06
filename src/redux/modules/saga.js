import {all, fork} from 'redux-saga/effects'
import authSaga from './auth/saga'
import httpSaga from './http/saga'

export default () =>
  function* root() {
    return yield all([fork(authSaga), fork(httpSaga)])
  }
