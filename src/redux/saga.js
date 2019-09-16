import {all, fork} from 'redux-saga/effects'
import componentsSaga from '@/components/saga'

export default () =>
  function* root() {
    return yield all([fork(componentsSaga)])
  }
