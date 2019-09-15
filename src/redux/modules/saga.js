import {all} from 'redux-saga/effects'

export default () =>
  function* root() {
    return yield all([
      /* sagas */
    ])
  }
