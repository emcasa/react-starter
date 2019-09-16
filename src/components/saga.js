import {all, fork} from 'redux-saga/effects'
import auth from './auth/saga'

export default function* rootComponentsSaga() {
  yield all([fork(auth)])
}
